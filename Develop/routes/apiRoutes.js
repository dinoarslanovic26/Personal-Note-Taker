const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const summary = path.join(__dirname, '../db/db.json');


router.get('/notes', (req, res,) => {
    fs.promises.readFile(summary, 'utf8')
      .then(data => {
        const note = JSON.parse(data);
        res.json(note);
      })
      .catch(err => {
        console.error(err);
      });
  });
  
router.post('/notes', async (req, res,) => {
  try {
    const list = req.body;
    const data = await fs.promises.readFile(summary, 'utf8');
    const notes = JSON.parse(data);
    notes.push(list);
    
    await fs.promises.writeFile(summary, JSON.stringify(notes));
    res.json(list);
  }
  catch (err) {
    console.error(err);
  }
});


//add deletion here and need to figure it out still


module.exports = router;