import {env as GXC, ISerializable} from "./env"
import {DataStream} from "./datastream"

export class Database<T> implements ISerializable {
    
    private tableName: u64
    private items: Array[]
    
    constructor(tableName: u64) {
        this.tableName = tableName;
    }

    class Item extends T {
        pk: u64
        key_count: u32
        keys: Array[]
    
        constructor(o: T) {
            
        }
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