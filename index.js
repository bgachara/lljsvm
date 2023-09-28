const readline = require('readline');
const createMemory = require('./create-memory');
const CPU = require('./cpu');
const instructions = require('./instructions');
const MemoryMapper = require('./memory-mapper');
const createScreenDevice = require('./screen-device');

const IP = 0;
const ACC = 1;
const R1 = 2;
const R2 = 3;
const R3 = 4;
const R4 = 5;
const R5 = 6;
const R6 = 7;
const R7 = 8;
const R8 = 9;
const SP = 10;
const FP = 11;

const MM = new MemoryMapper();

const memory = createMemory(256*256);
MM.map(memory, 0, 0xffff);

//map 0xffff bytes of the address space to an output device - just stdout
MM.map(createScreenDevice(), 0x3000, 0x30ff, true);

const writableBytes = new Uint8Array(memory.buffer);


const cpu = new CPU(MM);

let i = 0;

const writeCharToScreen = (char, command, position) => {
  
  writableBytes[i++] = instructions.MOVE_LIT_REG;
  writableBytes[i++] = command;
  writableBytes[i++] = char.charCodeAt(0);
  writableBytes[i++] = R1;

  writableBytes[i++] = instructions.MOVE_REG_MEM;
  writableBytes[i++] = R1;
  writableBytes[i++] = 0x30;
  writableBytes[i++] = position;
};

// "Hello World!".split('').forEach((char, index) => {
//   writeCharToScreen(char, index);
// });

writeCharToScreen(' ', 0xff, 0);

for (let index = 0; index <= 0xff; index++) {
  const command = index % 2 === 0 ? 0x01 : 0x02;
  writeCharToScreen('*', command, index);
}

writableBytes[i++] = instructions.HLT;


cpu.run();

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x22;
// writableBytes[i++] = 0x22;

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x11;
// writableBytes[i++] = 0x11;

// writableBytes[i++] = instructions.MOVE_LIT_REG;
// writableBytes[i++] = 0x12;
// writableBytes[i++] = 0x34;
// writableBytes[i++] = R1;

// writableBytes[i++] = instructions.MOVE_LIT_REG;
// writableBytes[i++] = 0x56;
// writableBytes[i++] = 0x78;
// writableBytes[i++] = R4;

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x00;
// writableBytes[i++] = 0x00;


// writableBytes[i++] = instructions.CAL_LIT;
// writableBytes[i++] = (subroutineAddress & 0xff00) >> 8;
// writableBytes[i++] = (subroutineAddress & 0xff00);

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x44;
// writableBytes[i++] = 0x44;

// //subroutine
// i = subroutineAddress;

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x01;
// writableBytes[i++] = 0x02;

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x03;
// writableBytes[i++] = 0x04;

// writableBytes[i++] = instructions.PSH_LIT;
// writableBytes[i++] = 0x05;
// writableBytes[i++] = 0x06;

// writableBytes[i++] = instructions.MOVE_LIT_REG;
// writableBytes[i++] = 0x07;
// writableBytes[i++] = 0x08;
// writableBytes[i++] = R1;

// writableBytes[i++] = instructions.MOVE_LIT_REG;
// writableBytes[i++] = 0x09;
// writableBytes[i++] = 0x0A;
// writableBytes[i++] = R8;


// writableBytes[i++] = instructions.RET; // writableBytes[i++] = instructions.MOVE_REG_MEM; // writableBytes[i++] = ACC; // writableBytes[i++] = 0x01; // writableBytes[i++] = 0x00; //0x0100 
// // writableBytes[i++] = instructions.MOVE_MEM_REG;
// // writableBytes[i++] = 0x01;
// // writableBytes[i++] = 0x00;
// writableBytes[i++] = R1;

// writableBytes[i++] = instructions.MOVE_LIT_REG;
// writableBytes[i++] = 0x00;
// writableBytes[i++] = 0x01;
// writableBytes[i++] = R2;

// writableBytes[i++] = instructions.ADD_REG_REG;
// writableBytes[i++] = R1;
// writableBytes[i++] = R2;

// writableBytes[i++] = instructions.MOVE_REG_MEM;
// writableBytes[i++] = ACC;
// writableBytes[i++] = 0x01;
// writableBytes[i++] = 0x00; //0x0100

// writableBytes[i++] = instructions.JMP_NOT_EQ;
// writableBytes[i++] = 0x00;
// writableBytes[i++] = 0x03;
// writableBytes[i++] = 0x00; //0x0100
// writableBytes[i++] = 0x00; //0x0100



// cpu.debug();
// cpu.viewMemoryAt(cpu.getRegister('ip'));
// cpu.viewMemoryAt(0xffff - 1 - 42, 44);


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on('line', () => {
//   cpu.step();
//   cpu.debug();
//   cpu.viewMemoryAt(cpu.getRegister('ip'));
//   cpu.viewMemoryAt(0xffff - 1 - 42, 44);
// });

// cpu.step();
// cpu.debug();
// cpu.viewMemoryAt(cpu.getRegister('ip'));
// cpu.viewMemoryAt(0x0100);

// cpu.step();
// cpu.debug();
// cpu.viewMemoryAt(cpu.getRegister('ip'));
// cpu.viewMemoryAt(0x0100);

// cpu.step();
// cpu.debug();
// cpu.viewMemoryAt(cpu.getRegister('ip'));
// cpu.viewMemoryAt(0x0100);
