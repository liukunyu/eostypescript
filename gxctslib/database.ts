import {db_get_i64, db_find_i64, prints,printi, ISerializable} from "./env"
import {DataStream} from "./datastream"
import {string2cstr} from "./utils";

import {
    HEADER_SIZE,
    MAX_LENGTH,
    allocateUnsafe,
    isWhiteSpaceOrLineTerminator,
    CharCode,
    parse
  } from "~lib/internal/string";
  import {
      String
    } from "~lib/string";
export class Database<T> {
    
    private code1: u64
    private scope1: u64
    private table1: u64
    
    constructor(code1: u64, scope1: u64, table1: u64) {
        this.code1 = code1;
        this.scope1 = scope1;
        this.table1 = table1;
    }
    
    Get(key: u64) : void {
        printi(this.code1);
        printi(this.scope1);
        printi(this.table1);
        printi(key);
        let itr: i32 = db_find_i64(this.code1, this.scope1, this.table1, key);
    printi(itr);
    
    var buffer = string2cstr("0000000000000");
        db_get_i64(itr, <usize>buffer, 12);
        prints(buffer);
    }
    
    Update(key: u64) : void {
        
    }
    
    Insert(key: u64, obj: T) : u64 {
        return 1
    }
    
    Delete(key: u64) : void {
        
    }
    
    
}