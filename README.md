# LLJSVM

- This is a 16-bit virtual machine implemented in Javascript as per the Low Level Productions guide.
- The virtual machine is implemented as a learning tool into the low level workings of a computer, i.e cpu, memory.

## Features

- A flexible, extensible, register-based virtual machine.
- Signed, unsigned and floating point operations.
- Call stack/ Stack frame structures.
- Interrupt capabilities.
- Memory mappings
- Powerful assembly language.
- C-like language

## Instructions types

- Moving data around.
- Math and manipulation.
- Jumping around.
- Comparisons, decisions and branching.
- Subroutines.

## Considerations

- Memory and Time are important and should be optimized for.
- Tradeoffs.
- Von Neumann, Fetch, Decode and Execute cycle.
- Registers encoded in bytes are hard to change.

## Stack Implementation

- A region of memory and a pointer(stores address) to temporary store state and as we interact with it, pointer moves around.
- Simplifies working with modular code in the form of subroutines.
- Stack pointer - keep track of position, stack pointer decreases with push as it grows downward.
- Push and Pop in LIFO manner.
- On calling a subroutine, stack is used to hold state of registers, instruction pointer included, which are later restored on return. 
- This data structure is called a stack frame.
- Stacks frames grow on subroutines.
- Frame pointer points to the beginning of the stack frame.
