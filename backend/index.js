const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'twierdza1',
        database: 'PO'
    }
});

app.get('/miejsca',(req, res) => {
    db.select('miejsca.nazwa','miejsca.opis','udogodnienia.opis_u','miasto','ulica','numer')
    .from('miejsca').leftJoin('udogodnienia', 'miejsca.nazwa','=','udogodnienia.nazwa')
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log(err));
    }
);

app.get('/rodzajeWydarzen',async (req, res) => {
    try{
        const rodzajeWydarzen = await db.select('nazwa').from('rodzaje_wydarzen');
        res.send(rodzajeWydarzen);
    }
    catch (e) {
        console.log(e);
    }
});

app.post('/miejsce', (req, res) => {
    db
    .select('miejsca.nazwa','miejsca.opis','udogodnienia.opis_u','miasto','ulica','numer')
    .from('miejsca')
    .leftJoin('udogodnienia', 'miejsca.nazwa','=','udogodnienia.nazwa')
    .leftJoin('miejscarodzajewydarzen','miejsca.id','=','miejscarodzajewydarzen.miejsceid')
    .distinct()
    .modify(function(queryBuilder){
        if(req.body.miasto)queryBuilder.where('miasto', req.body.miasto);
        if(req.body.rodzajWydarzenia)queryBuilder.where('miejscarodzajewydarzen.rodzajwydarzenia',req.body.rodzajWydarzenia)
    })
    .then(data => res.json(data))
    .catch(err => console.log(err))
});

app.get('/wydarzenia',async (req,res) =>{
  try { 
    const wydarzenia = await  db.select('*').from('wydarzenia');
    const data = wydarzenia.map(async event =>  {
        const guestsNumber = await db('wydarzenia').leftJoin('goscie','wydarzenia.id','=','goscie.wydarzeniaid')
        .count('goscie.id').groupBy('wydarzenia.id').as('guestsNumber').where('wydarzenia.id',event.id);
        return({...event, guestsNumber: guestsNumber[0].count});
    });
    Promise.all(data)
    .then(data => {
        console.log(data)
        res.json(data)
    })
    } catch (e) {
        console.log(e);
    }
});

app.get('/wydarzenie/:id', async (req,res,next) =>{
    try{
        const {id} = req.params;
        const wydarzenie = await db.select('*').from('wydarzenia').where('id',id);
        const goscie = await db.select('imie','nazwisko').from('goscie').where('wydarzeniaid',id);
        // const uslugodawcy = await db.select('nazwa')
        // .from('zlecenia').leftJoin('uslugodawcy','zlecenia.uslugodawcyid','=','uslugodawcy.uslugodawcyid');
        const eventData = {event: wydarzenie, guests: goscie};
        res.json(eventData);
    } catch (e) {
        console.log(e);
        next(e);
    }
   
});

app.put('/wydarzenie', (req,res) => {
    const {id, name, type, date} = req.body;
    db('wydarzenia').insert({
        organizatorzyid: parseInt(id),
        nazwa: name,
        rodzaj_wydarzenia: type,
        data_wydarzenia: date
    })
    .returning("*")
    .then(data => {
        data.guestsNumber = 0;
        res.json(data)})
    .catch(err => console.log(err))
});

app.post('/wydarzenie', async (req,res) => {
    try{
        const {event, guests} = req.body;
        const goscie = await db.select('imie','nazwisko').from('goscie').where('wydarzeniaid',event.id);
        db.transaction(trx =>{
            trx('wydarzenia')
            .where('id',event.id)
            .update({
                nazwa: event.name,
                rodzaj_wydarzenia: event.type,
                data_wydarzenia: event.date
            })
            .returning('*')
            .then(async newEvent => {
                try{
                    if(goscie.length > 0){
                        await trx('goscie').where('id', event.id).del();
                        const newGuests = await trx('goscie').insert(guests).returning(['imie','nazwisko']);
                        const modifiedEvent = { newEvent, newGuests };
                        res.json(modifiedEvent);
                    } else {
                        const newGuests = await trx('goscie').insert(guests).returning(['imie','nazwisko']);
                        const modifiedEvent = { newEvent, newGuests };
                        res.json(modifiedEvent);
                    }
                }
                catch(e){
                    console.log(err);
                }
            })
            .then(() =>{
                trx.commit();
            })
            .catch(err => {
                console.log(err);
                trx.rollback();
            })
        })
    } catch(e){
        console.log(e);
    }
});



app.listen(3001, () => {
    console.log('App running on port 3001');
});