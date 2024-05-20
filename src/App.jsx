import React, { useState, useEffect } from "react";
import data from "./data/data.js";

const App = () => {
  const [mainList, setMainList] = useState(data[0]);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);

  // รับพารามิเตอร์ itemId, itemType
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
      // อัพเดต mainList โดยเพิ่มไอเท็มใหม่เข้าไป
      setMainList((prevList) => [
        ...prevList, //คัดลอกรายการเดิมทั้งหมดใน mainList
        { ...itemToMove, timeLeft: undefined },
      ]); // เพิ่ม item ใหม่ โดยตั้งค่า timeLeft เป็น underfined
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
        // กรณีประเภทเป็น Fruit
        case "Fruit":
          // ใช้ setFruitList เพื่อทำการเพิ่ม updateItem เข้าไปใน fruitList
          setFruitList((prevList) => [...prevList, updatedItem]);
          break;
        // กรณีประเภทเป็น Vegetable
        case "Vegetable":
          // ใช้ setVegetableList เพื่อทำการเพิ่ม updateItem เข้าไปใน vegetableList
          setVegetableList((prevList) => [...prevList, updatedItem]);
          break;
        default:
          break; // หาก itemType ไม่ใช่ 'Fruit' หรือ 'Vegetable' ไม่ต้องทำอะไร
      }
      // ใช้ setMainList ทำการอัพเดท MainList โดยลบ item ที่มี id ตรงกับ itemId
      setMainList((prevList) => prevList.filter((item) => item.id !== itemId));
    }
  };

  useEffect(() => {
    // สร้างตัวแปร timer ที่จะเรียกใช้ callback ทุกๆ 1 วินาที
    const timer = setInterval(() => {
      // ใช้ setFruitList สำหรับอัพเดท fruitList
      setFruitList(
        (prevList) =>
          prevList
            .map((item) => {
              // ถ้า timeleft มากกว่า 1
              if (item.timeLeft > 1) {
                // ทำการคัดลอก item ทั้งหมด  และลดค่า time ลงทีละ 1
                return { ...item, timeLeft: item.timeLeft - 1 };
              } else {
                //ถ้า time ของ item เหลือ <= 1
                // ใช้ setMainList ทำการย้าย item ไปที่ mainList และตั้งค่า time เป็น Undefined
                setMainList((mainPrevList) => [
                  ...mainPrevList,
                  { ...item, timeLeft: undefined },
                ]);
                // คืนค่า null เพื่อให้ลบ item ออกจาก fruitList
                return null;
              }
            })
            .filter(Boolean) // ใช้กรองค่า null ออกจากผลลัพธ์ของ 'map'
      );
      // ใช้ setVegetableList สำหรับอัพเดท vegetableList
      setVegetableList(
        (prevList) =>
          prevList
            .map((item) => {
              if (item.timeLeft > 1) {
                // ทำการคัดลอก item ทั้งหมด  และลดค่า time ลงทีละ 1
                return { ...item, timeLeft: item.timeLeft - 1 };
              } else {
                //ถ้า time ของ item เหลือ <= 1
                // ใช้ setMainList ทำการย้าย item ไปที่ mainList และตั้งค่า time เป็น Undefined
                setMainList((mainPrevList) => [
                  ...mainPrevList,
                  { ...item, timeLeft: undefined },
                ]);
                // คืนค่า null เพื่อให้ลบ item ออกจาก vegetableList
                return null;
              }
            })
            .filter(Boolean) // ใช้กรองค่า null ออกจากผลลัพธ์ของ 'map'
      );
    }, 1000); // ตั้งเวลาเป็น 1000 มิลลิวินาที (ๅ วินาที)
    // เรียกใช้ฟังก์ชัน clearInterval(timer) เพื่อหยุด setInterval ที่ถูกตั้งไว้
    return () => clearInterval(timer);
  }, []); // ให้ useEffect ทำงานเพียงครั้งเดียวหลังจาก component mount

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
