import {db_store_i64, db_get_i64, db_find_i64} from "./env"
import {DataStream} from "./datastream"

export class Database<T> {
    
    private code: u64
    private scope: u64
    private table: u64
    private buf: Array<u8>
    private ds: DataStream
    
    constructor(code: u64, scope: u64, table: u64) {
        this.code = code;
        this.scope = scope;
        this.table = table;
        buf = new Array<u8>(sizeof<T>());//TODO check: type T have arrary props?
        ds = new DataStream(<usize>buf, sizeof<T>());
    }
    
    get<T>(key: u64) : T {
        let itr: i32 = db_find_i64(this.code, this.scope, this.table, key);
        let len: i32 = db_get_i64(itr, <usize>0, 0);
        db_get_i64(itr, <usize>buf, len);
        return T.from_ds(ds);
    }
    
    update<T>(instance: T) : void {
        
    }
    
    insert<T>(instance: T) : u32 {
        T.to_ds(instance, ds);
        return db_store_i64(this.scope, this.table, 0, instance.key, <uszie>buf, len);
    }
    
    delete(key: u64) : void {
        
    }
}