const express = require('express');
const Server = express();
const PORT = 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://singhdevraj021222:dev@cluster0.eoso76e.mongodb.net/carsDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const carSchema = new mongoose.Schema({
  id: Number,
  name: String,
  Brand: String,
  Price: String,
  Fuel_Type: String,
  Image: String,
});

const Car = mongoose.model('Car', carSchema);


// let cars = [
//     { 
//         id: 1,
//         name: 'Mercedes-Benz S-Class',
//         Brand: 'Mercedes-Benz',
//         Price: 'Starting from $94,250',
//         Fuel_Type: 'Petrol, Diesel, Plug-in Hybrid',
//         Image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/S-Class/10853/1690451611932/front-left-side-47.jpg' 
//     },
//     { 
//         id: 2,
//         name: 'Audi A8',
//         Brand: 'Audi',
//         Price: 'Starting from $85,200',
//         Fuel_Type: 'Petrol, Diesel, Plug-in Hybrid',
//         Image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/106825/right-front-three-quarter0.jpeg?isig=0&wm=0' 
//     },
//     { 
//         id: 3,
//         name: 'Rolls-Royce Phantom',
//         Brand: 'Rolls-Royce',
//         Price: 'Starting from $455,000',
//         Fuel_Type: 'Petrol',
//         Image: 'https://images.hindustantimes.com/auto/img/2022/11/03/1600x900/rolls-royce-phantom-series-II_1667439771956_1667439772150_1667439772150.jpg' 
//     },
//     { 
//         id: 4,
//         name: 'Bentley Continental GT',
//         Brand: 'Bentley',
//         Price: 'Starting from $202,500',
//         Fuel_Type: 'Petrol',
//         Image: 'https://www.mansory.com/sites/default/files/styles/1920x800_fullwidth_car_slider/public/migrated/cars/Cars/bentley/continental_gt_gtc_speed/mansory_bentley_continental_gt_gtc_speed_01.jpg?h=9d7554de&itok=ypJ9f6er' 
//     },
// ]

Server.use(express.json());
// Server.get('/',(req, res) => {
//     res.send(`<div style="height: 100%; width: 100%; background-color: rgb(187, 247, 227); display: flex; justify-content: center; align-items: center;">
//     <div style="height: 30%; width: 50%; background-color: #fff; display: flex; justify-content: center; border-radius: 20px; align-items: center;">
//         <h1 style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-size: 100px; font-weight: lighter; ">HELLO!</h1>
//     </div>
// </div>`)
// });
 `1 `
// Read All
Server.get('/cars', async (req, res) => {
    try {
      const cars = await Car.find({});
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  Server.post('/cars', async (req, res) => {
    const car = new Car(req.body);
  
    try {
      await car.save();
      res.status(201).send('created');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  Server.get('/cars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      const car = await Car.findOne({ id });
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  Server.put('/cars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      const car = await Car.findOneAndUpdate({ id }, req.body, { new: true });
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  Server.delete('/cars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      const car = await Car.findOneAndDelete({ id });
      if (car) {
        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

Server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  