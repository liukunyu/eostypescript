import {DataStream} from "./datastream"

export class Create {
  
  constructor(user : u64, game : u64, num_rows : u32, num_cols : u32, seed : u32) {
    this.user     = user;
    this.game     = game;
    this.num_rows = num_rows;
    this.num_cols = num_cols;
    this.seed     = seed;
  }

  static from_ds(ds : DataStream) : Create {
    return new Create(
      ds.read<u64>(),
      ds.read<u64>(),
      ds.read<u32>(),
      ds.read<u32>(),
      ds.read<u32>()
    );
  }

  static to_ds(instance : Create, ds : DataStream) : void {

  }

  user     : u64;
  game     : u64;
  num_rows : u32;
  num_cols : u32;
  seed     : u32;
}
