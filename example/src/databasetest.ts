import "allocator/arena";

import {printi, prints, Contract}   from "../../gxctslib/env";
import {string2cstr, N, assert}     from "../../gxctslib/utils";
import {Database}                   from "../../gxctslib/database";
import {DataStream}                 from "../../gxctslib/datastream"

export function apply(receiver: u64, code: u64, action: u64): void {
  var gol: DatabaseTest = new DatabaseTest(receiver);
  gol.apply(code, action);
}

/***************** HELLOWORLD CLASS ***********************/
class DatabaseTest extends Contract {
  @database
  students: Database<Student> = new Database<Student>(this.receiver, this.receiver, N("students"));

  @action
  add_student(student: Student): void {
      this.students.insert(student);
  }
  
  @action
  get_student(id: u64) : T {
      return this.students.Get(id);
  }
  
  apply(code: u64, action: u64): void {
    if (action == N("addstudent")) {
        this.add_student(Student.from_ds(this.get_ds()));
    } else if (action == N("getstudent")) {
        this.get_student(this.get_ds().read<u64>());
    } else {
      assert(false, "unknown action");
    }
  }
}

class Student {
    id: u64
    age: u8
    score: u32
    
    constructor(id : u64, age : u8, score : u32) {
        this.id = id;
        this.age = age;
        this.score = score;
    }

    static from_ds(ds : DataStream) : Student {
        return new Student(
                ds.read<u64>(),
                ds.read<u8>(),
                ds.read<u32>()
        );
    }

    static to_ds(instance : Student, ds : DataStream) : void {
        ds.store<u64>(instance.id);
        ds.store<u8>(instance.age);
        ds.store<u32>(instance.score);
    }
}
