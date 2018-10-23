import "allocator/arena";

import { env as GXC, ISerializable, Contract } from "../../gxctslib/gxclib";
import { DataStream } from "../../gxctslib/datastream";
import { printstr, N, assert } from "../../gxctslib/utils";
import { Create, Remove, RemoveAll, Step } from "../../gxctslib/actions";

export function apply(receiver: u64, code: u64, action: u64): void {
  var gol: HelloWorld = new HelloWorld(receiver);
  gol.apply(code, action);
}

/***************** HELLOWORLD CLASS ***********************/
export class HelloWorld extends Contract {

  dummy: u64;


  // create action
  on_create(args: Create): void {

    GXC.printi(args.game);
    GXC.printi(args.num_rows);
    GXC.printi(args.num_cols);
    GXC.printi(args.seed);
//    let board = Board.gen_random(args.game, args.num_rows, args.num_cols, args.seed);
//
//    let arr = new Uint8Array(64000);
//    let ds = new DataStream(<usize>arr.buffer, 64000);
//
//    Board.to_ds(board, ds);
//    let it = GXC.db_store_i64(args.user, N("boards"), args.user, args.game, ds.buffer, ds.pos);
  }

  apply(code: u64, action: u64): void {
    if (action == N("create")) {
      this.on_create(Create.from_ds(this.get_ds()));
    } else {
      assert(false, "unknown action");
    }
  }
}

/***************** BOARD CLASS ***********************/

export class BoardSize {
  num_rows: i32;
  num_cols: i32;

  constructor(num_rows: i32, num_cols: i32) {
    this.num_rows = num_rows;
    this.num_cols = num_cols;
  }
};

export class Board implements ISerializable {
  game: u64;
  rows: string[];

  static from_ds(ds: DataStream): Board {
    let game: u64 = ds.read<u64>();
    let rows: string[] = [];
    let len = ds.readVarint32();
    if (len) {
      rows = new Array<string>(len);
      for (var i: u32 = 0; i < len; i++) {
        rows[i] = ds.readString();
      }
    }
    let b = new Board();
    b.game = game;
    b.rows = rows;
    return b;
  }

  static to_ds(instance: Board, ds: DataStream): void {
    ds.store<u64>(instance.game);
    let rows = instance.rows;
    ds.writeVarint32(rows.length);
    if (rows.length) {
      for (var i: i32 = 0; i < rows.length; i++) {
        ds.writeString(rows[i]);
      }
    }
  }

  static gen_random(game: u64, num_rows: u32, num_cols: u32, seed: u32): Board {
    let b = new Board();
    b.game = game;
    b.rows = new Array<string>();
    for (var i: u32 = 0; i < num_rows; ++i) {
      let s = "";
      for (var j: u32 = 0; j < num_cols; ++j) {
        seed = rnd(seed);
        s += seed & 1 ? "*" : " ";
      }
      b.rows.push(s);
    }
    return b;
  }

  get_size(): BoardSize {
    let num_rows: i32 = this.rows.length;
    assert(num_rows >= 3, "game is corrupt");
    let num_cols: i32 = this.rows[0].length;
    assert(num_cols >= 3, "game is corrupt");
    for (var i: i32 = 0; i < this.rows.length; i++)
      assert(this.rows[i].length == num_cols, "game is corrupt");

    return new BoardSize(num_rows, num_cols);
  }

  static alive(old: Board, bsize: BoardSize, r: i32, c: i32, dr: i32, dc: i32): u32 {
    return old.rows[(r + dr + bsize.num_rows) % bsize.num_rows]
    [(c + dc + bsize.num_cols) % bsize.num_cols] != " " ? 1 : 0;
  };

}

function rnd(seed: u32): u32 {
  seed = (16807 * seed) % 2147483647;
  return seed;
}
