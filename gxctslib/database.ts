import {db_get_i64, db_find_i64, ISerializable} from "./env"
import {DataStream} from "./datastream"

export class Database<T> implements ISerializable {
    
    private tableName: u64
    
    constructor(tableName: u64) {
        this.tableName = tableName;
    }
    
    public function Get(key: u64) : T {
    }
    
    public function Update(key: u64) : void {
        
    }
    
    public function Insert(key: u64, obj: T) : u64 {
        return 1
    }
    
    public function Delete(key: u64) : void {
        
    }
    
    
}