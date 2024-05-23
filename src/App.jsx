import React, { useState, useEffect } from "react";
import data from "./data/data.js";

const App = () => {
  const [mainList, setMainList] = useState(data[0]);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [timers, setTimers] = useState({});

  const moveItemToMainList = (itemId, itemType) => {
    // ตัวแปรสำหรับเก็บ itemId, itemType
    let itemToMove;
    // ใช้ switch เพื่อเลือกประเภทของ itemType
    switch (itemType) {
      // กรณีประเภทเป็น Fruit
      case "Fruit":
        // ค้นหา item ใน fruitList ที่มีค่า id เท่ากับ itemId
        itemToMove = fruitList.find((item) => item.id === itemId);
        // ใช้ setFruitList สำหรับ ลบ item ออกจาก fruitList โดยใช้ filter ลบ id ที่ตรงกับ itemId
        setFruitList((prevList) =>
          prevList.filter((item) => item.id !== itemId)
        );
        break;
      // กรณีประเภทเป็น Vegetable
      case "Vegetable":
        // ค้นหา item ใน vegetableList ที่มีค่า id เท่ากับ itemId
        itemToMove = vegetableList.find((item) => item.id === itemId);
        // ใช้ setVegetableList สำหรับ ลบ item ออกจาก vegetableList โดยใช้ filter ลบ id ที่ตรงกับ itemId
        setVegetableList((prevList) =>
          prevList.filter((item) => item.id !== itemId)
        );
        break;
      default:
        break; // หาก itemType ไม่ใช่ 'Fruit' หรือ 'Vegetable' ไม่ต้องทำอะไร
    }
    // ตรวจสอบว่า (itemToMove) มีค่า (ไม่เป็น undefined หรือ null)
    if (itemToMove) {
      // ทำการเคลียร์ Time ที่เกี่ยวกับ item นี้เพื่อหยุดการนับถอยหลัง
      clearTimeout(timers[itemId]);
      // อัพเดต mainList โดยเพิ่มไอเท็มใหม่เข้าไป
      setMainList((prevList) => [
        ...prevList, //คัดลอกรายการเดิมทั้งหมดใน mainList
        { ...itemToMove, timeLeft: undefined },// เพิ่ม item ใหม่ โดยตั้งค่า timeLeft เป็น underfined
      ]); 
      // อัพเดท timers state โดยลบ timer ที่เกี่ยวข้องกับ item นี้ออก
      setTimers((prevTimers)=>{
        // ใช้ destructuring เพื่อสร้าง object ใหม่ที่ไม่รวม timer ที่ถูก clear ออก
        const {[itemId]: _, ...rest} = prevTimers;
        return rest; // คืนค่า Object ใหม่ที่ไม่รวม timer ที่ถูก clear ออก
      })
    }
  };
  // สร้างตัวแปรเก็บค่าพารามิเตอร์ itemId, itemType
  const moveItemToCategory = (itemId, itemType) => {
    // ค้นหา item ใน mainList ที่มี id เท่ากับ itemId
    const item = mainList.find((item) => item.id === itemId);
    // ตรวจสอบว่า (item) มีค่า (ไม่เป็น underfined หรือ null )
    if (item) {
      // สร้าง Object ใหม่ที่คัดลอก item ทั้งหมด และตั้งค่า time = 5
      const updatedItem = { ...item, timeLeft: 5 };
      // ใช้ switch เพื่อเลือกประเภทของ itemType
      switch (itemType) {
        case "Fruit":
          // ใช้ setFruitList เพื่อทำการเพิ่ม updateItem เข้าไปใน fruitList
          setFruitList((prevList) => [...prevList, updatedItem]);
          break; //break case Fruit
        case "Vegetable":
          // ใช้ setVegetableList เพื่อทำการเพิ่ม updateItem เข้าไปใน vegetableList
          setVegetableList((prevList) => [...prevList, updatedItem]);
          break; //break case Vegetable
        default:
          break;  // หาก itemType ไม่ใช่ 'Fruit' หรือ 'Vegetable' ไม่ต้องทำอะไร
      }
      // ใช้ setMainList ทำการอัพเดท MainList โดยลบ item ที่มี id ตรงกับ itemId
      setMainList((prevList) => prevList.filter((item) => item.id !== itemId));
  
      // สร้างตัวแปร timerId เพื่อเรียกใช้ เมื่อเวลาครบตามที่กำหนด
      const timerId = setTimeout(() => {
        // ใช้ switch เพื่อเลือกประเภทของ itemType
        switch (itemType) {
          // กรณี Type เป็น fruit
          case "Fruit":
            // ใช้ setFruitList เพื่อลบ item ออกจา fruitList โดยใช้ filter ลบ id ที่ตรงกับ itemId
            setFruitList((prevList) =>
              prevList.filter((item) => item.id !== itemId)
            );
            break; // break case fruit
          // กรณี Type เป็น vegetable
          case "Vegetable": 
            // ใช้ setVegetableList เพื่อลบ item ออกจา vegetableList โดยใช้ filter ลบ id ที่ตรงกับ itemId
            setVegetableList((prevList) =>
              prevList.filter((item) => item.id !== itemId)
            );
            break; // break case vegetable
          default:
            break; // หาก itemType ไม่ใช่ 'Fruit' หรือ 'Vegetable' ไม่ต้องทำอะไร
        }
        // ใช้ setMainList ทำการอัพเดท MainList
        setMainList((prevList) => {
          // เพิ่มเฉพาะเมื่อ item ยังไม่อยู่ใน MainList
          if (!prevList.some((prevItem) => prevItem.id === updatedItem.id)) {
            return [...prevList, updatedItem];
          }
          return prevList;
        });
        
        // อัพเดท timers state โดยลบ timer ที่เกี่ยวข้องกับ item นี้ออก
      setTimers((prevTimers)=>{
        // ใช้ destructuring เพื่อสร้าง object ใหม่ที่ไม่รวม timer ที่ถูก clear ออก
        const {[itemId]: _, ...rest} = prevTimers;
        return rest; // คืนค่า Object ใหม่ที่ไม่รวม timer ที่ถูก clear ออก
        })
      }, 5000);
      // อัพเดต timers state โดยเพิ่ม timer ใหม่เข้าไป
      setTimers((prevTimers) => ({
        ...prevTimers, // คัดลอก timers เดิมทั้งหมด
        [itemId]: timerId, // เพิ่ม timer ใหม่สำหรับ item นี้ โดยใช้ itemId เป็น key และ timerId เป็น value
      }));
    }
  };
  

  useEffect(() => {
    // สร้างตัวแปร interval ที่จะทำงานทุก ๆ 1 วินาที
    const interval = setInterval(() => {
      // อัพเดท fruitList
      setFruitList((prevList) =>
        prevList.map((item) =>
          item.timeLeft 
            ? { ...item, timeLeft: item.timeLeft - 1 } // ลคค่า timeLeft ลง 1 วินาที
            : { ...item, timeLeft: undefined } // ถ้า timeLeft ไม่มีค่า ให้ตั้งเป็น undefined
        )
      );
      setVegetableList((prevList) =>
        prevList.map((item) =>
          item.timeLeft 
            ? { ...item, timeLeft: item.timeLeft - 1 }  // ลคค่า timeLeft ลง 1 วินาที
            : { ...item, timeLeft: undefined } // ถ้า timeLeft ไม่มีค่า ให้ตั้งเป็น undefined
        )
      );
    }, 1000); //ตั้งค่า interval ให้ทำงานทุก ๆ 1000 มิลลิวินาที (1 วินาที)
    // ทำการ return ฟังก์ชันที่ใช้เพื่อเคลียร์ interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-5 d-flex d-block justify-content-between">
      <div className="main-list pt-1 p-5 w-50 text-center border rounded-2">
        <h2>Main List</h2>
        <hr />
        {mainList.map((item) => (
          <div key={item.id} className="d-flex align-content-center">
            <button
              className="btn btn-primary btn-block w-100 mt-2 p-3 fs-5 hover"
              key={item.id}
              onClick={() => moveItemToCategory(item.id, item.type)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="fruit pt-1 p-5 w-50 text-center border rounded-2">
        <h2>Fruit</h2>
        <hr />
        {fruitList.map((item) => (
          <div key={item.id} className="d-flex align-content-center">
            <button
              className="btn btn-success btn-block w-100 mt-2 p-3 fs-5"
              key={item.id}
              onClick={() => moveItemToMainList(item.id, "Fruit")}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="vegetable pt-1 p-5 w-50 text-center border rounded-2">
        <h2>Vegetable</h2>
        <hr />
        {vegetableList.map((item) => (
          <div key={item.id} className="d-flex align-content-center">
            <button
              className="btn btn-warning btn-block w-100 mt-2 p-3 fs-5"
              key={item.id}
              onClick={() => moveItemToMainList(item.id, "Vegetable")}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
