---
layout: ../../layouts/PostLayout.astro

title: "Learning elixir"
date: 2025-05-03
description: 'My journey following an elixir crash course.'
author: 'toine'
tags: ["elixir", "learning"]
resume: "I followed a crash course on youtube of elixir and I have took all those note. (except Tips&Tricks I have asked Copilot to generate it from the notes I have)"
---
## Tips & Tricks
Quick reference:
- Use `|>` for pipe operator
- Use `<>` for string concatenation
- Use `_` between numbers for better readability in large numbers
- Use `#{variable}` for string interpolation
- Commands with `!` will raise errors, without will return tuples
- Use `\\` for default parameters
- Use `h` command in iex to get help (e.g., `h is_nil`)
- Use `iex -S mix` to run interactive shell with project code
- Use `recompile` in iex to reload code changes
- Use `defp` for private functions
- Use `dbg()` for debugging
- Launch with `iex --dbg pry -S mix` for interactive debugging
- Functions with same name but different arity are shown as `function_name/arity`
- Use `++` to add items to a list (e.g., `list ++ [1, 2]`)
- Use `--` to remove items from a list (e.g., `list -- [1]`)
- Use `hd` to get the first item (head) of a list
- Use `tl` to get the remaining items (tail) of a list
- Use `List.last` to get the last item of a list
- Access map values with `map[:key]` or `map.key` (when key is atom)
- Use `Map.put(map, :key, value)` to add new values to a map
- Update map values with `%{map | key: new_value}`
- Kernel module functions are auto-imported (no need for `Kernel.` prefix)
- Pattern matching uses `=` operator
- Use `_` variable when you don't need to save the value
- Use atoms (`:name`) instead of strings for better memory efficiency when used multiple times
- Functions can have same name but different arity (`function/0`, `function/2`)
- 
## why #elixir ?

no class no object no inheritance no POO things.
It's a functional language.

pipe operator = `|>`
concatenate = `<>`

- good for scalability
- no class, object
- functional programming language
- run inside lighweights threads -> run a lot of elixir processes, run in parrallel so concurrency
- fault tolerence
	- supervisor descibe how to restart parts of the system when things goes wrong.
- growing ecosystem

mix.exs = package.json
.exs = elixir file format

HEEx = templating frontend language
- reusable components

## why you shouldn't learn elixir

- for first language not good idea
- functional programming but not gonna be able to reuse the gain from learning elixir to work on other language after
- not good if it's for a job

to install:
```Shell
brew install elixir
```

iex = interactive elixir to run our elixir program --> it's like running node

command `h`:
you can use it in iex with function I have created or native function.

Example h is_nil:
``` Elixir
iex(3)> h is_nil

defmacro is_nil(term)

guard: true

Returns true if term is nil, false otherwise.

Allowed in guard clauses.

## Examples

    iex> is_nil(1 + 2)
    false

    iex> is_nil(nil)
    true
```

## types
- integer (possible to add `_` between numbers in large numbers)
- float
- string (only double quotes) 
- #Atoms 
- boolean


there is div function who return int numbers


string interpolations = `"#{<your variable>} #{<next one>}"`

```iex
iex(5)>  name
"Daniel"
iex(6)> lastname = "yeslife"
"yeslife"
iex(7)> "#{name} {lastname}"
"Daniel {lastname}"
iex(8)> "#{name} #{lastname}"
"Daniel yeslife"
iex(9)>
```


## #Atoms

An atom is a constant whose value is its own name. Some other languages call these symbols. They are often useful to enumerate over distinct values, such as:

```iex 
iex(10)> :toine
:toine
iex(11)> :"Toine Riedo"
iex(12)> :"Toine Riedo"

```

benefits:
- if planning to use string more than once
- more memory efficient if string is use more than 1-2 times...

there is the `nil` type and not the null type 

Boolean are atoms:
```iex
iex(14)> is_atom(true)
true
iex(15)> is_atom(false)
true
iex(16)>
```


## operators

|| (or) &&(and) !(negation)

falsy && nil are falsy value other things are considered truthy value.
nil || (or) false || "daniel => return last truly value

true && 9.0 && "Daniel" && false => return last truely value --> false

when using the && operator if any of values are false we receive the falsy value.  

## immutability && functional programming

as said before no POO properties langages. 

function need to be inside a module in elixir:
```elixir
String.upcase("hi")
"HI"
```

the difference between node and elixir is that:
 "toine" in js can be considered as an object so you can do `"toine".length` or `.toUpperCase()`

but in elixir you can't.
```elixir
iex(7)> "toine".length
error: invalid call "toine".length
└─ iex:7

** (CompileError) cannot compile code (errors have been logged)

```

it's more verbose but you get used to it. 

++ [some numbers] to add item in array on elixir:
``` elixir
iex(9)> list
[1, 2, 3]
iex(10)> list ++ [999,34,2]
[1, 2, 3, 999, 34, 2] 
"""careful it won't add permanently the new items. to do it you need to do it this way:"""
list = list ++ [999,34,2]
[1, 2, 3, 999, 34, 2]
```

if you don't rebind it won't mutate. 

We avoid some potential bugs:
```elixir
iex(15)> list2 =list
[1, 2, 3, 999, 34, 2]
iex(16)> list2
[1, 2, 3, 999, 34, 2]
iex(17)> list = list ++ [233]
[1, 2, 3, 999, 34, 2, 233]
iex(18)> list2
[1, 2, 3, 999, 34, 2]
```


## Lists

singly linked list

[1,2,3] -->  each nodes on the list have the value and addr of the item:
[1, addr2] --> [2,addr3] -->[3,addr...]

it's better for concurrency
bc of linked list some things are more difficult than others
list = [2,3,4]
[1]++ list --> add 1 to list
or list ++[999] --> add 999 at the end to the list

BUT this it cost a lot because first it needs to go trough all the item in the list and then add the new item 

remove item from list is `--`
list -- [1]


`hd`: head function --> hd list == 1 
you can use the hd function with or without parentheses:
```elixir
iex(2)> list = [1,2,3]
[1, 2, 3]
iex(3)> list -- [1]
[2, 3]
iex(4)> hd list
1
iex(5)> hd(list)
1
iex(6)>
```

`tl` = tail function --> get last item after head in list

List.last --> get last item after head in list

Kernel module is auto imported in every model so all kernel function you don't need to add the `Kernel.hd` and things like that.

You can use `Enum` fn on list.

## Tuples

![[Capture d’écran 2025-04-05 à 21.22.14.png]]
```Elixir
iex(6)> File.
cd!/1            cd!/2            cd/1             chgrp!/2
```

The /1,2,3 are numbers or arguments needed.
The exclamation point means if it any time of error happens the function with ! will raise an error

for the other it will runs a tuples with error inside.

```Elixir
  @spec cd!(Path.t()) :: :ok

The same as cd/1, but raises a File.Error exception if it fails.
```

Tuples are fixed. with fix size
useful to read answer from fn calls:
```Elixir
File.read "hello.txt"
{:ok, ""}
```


usually don't want to raise error so avoiding using ! fn.

## Keyword lists

```Elixir
iex(5)> String.split("1 2 3 5 ", " ")
["1", "2", "3", "5", ""]
iex(6)> String.split("1 2 3 5 ", " ", trim: true)
["1", "2", "3", "5"]
```

[trim: true ] <-- is a keyword list
[{:trim, true}] <-- is a keyword list (:trim bc it's an #Atoms)

it's useful in query with params 

`\\`  <-- default attribute

## Maps

mainly use atoms as key
maps = key value store
how create a map:
```Elixir
map = %{"name" => "daniel", :age => 26, 1 => false}
```

simpler syntax:
```Elixir
map = %{name: "daniel", age: 26}
```

how to access them:
```Elixir 
iex(24)> map[:age]
26
```

if key is atom:
```Elixir
iex(26)> map.name
"daniel"
```

add new value to a map:
```Elixir
iex(37)> Map.put(map, :work, true)
%{name: "daniel", age: 26, work: true}
iex(38)> map = Map.put(map, :work, true)
%{name: "daniel", age: 26, work: true}
```

edit a field:
```Elixir
iex(40)> %{map | work: false}
%{name: "daniel", age: 26, work: false}
```

## Mix (build tool)

create new project:

`mix new <project name>`
`mix test`
`mix format`

interactive iex with file code:
`iex -S mix`



## Modules and function

create module:

```Elixir defmodule <Module in uppercase> do

<write stuff here>
end
```

1 module per file

if a file is in another folder ex: `helpers`

```Elixir
defmodule Helpers.Format do
  
end
```

define function:

```Elixir 
  def new do
    
  end

```

return something from function:
implicit returns

last line will be the return value from the function

You can run your code in iex this way:
```Elixir
➜  tutorial iex -S mix
Erlang/OTP 27 [erts-15.2.3] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [jit] [dtrace]

Compiling 3 files (.ex)
Generated tutorial app
Interactive Elixir (1.18.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> Users.new
%{name: "Toine Ri", age: 25}
```


to add parameters to function:
`def new(par1,par2,etc..) do`

to recompile code in iex, juste type `recomplile` on iex.

defining same function multiple time:
```Elixir 
defmodule Users do
  def new(name, age) do
    %{name: name, age: age}
  end

  def new do
    %{name: "toine", age: 25}
  end
end
```

```Elixir
iex(5)> Users.new
new/0    new/2
"""
1 takes 2 parameters and one 0. 
"""
```


function visibility:
```Elixir 
defp generate_default_users do
    %{name: "John", age: 30}
  end
```

it will be private with the `defp`

one line function:
```Elixir
def oneline, do: IO.puts("Hello")

iex(7)> Users.oneline
Hello
:ok

```


## Import and alias

### Import
first option:
```Elixir
def new(name, age) do
    formatted_name = Helpers.Format.trim_text(name)
    %{name: formatted_name, age: age}
  end

```

to import all the funcs from a module:
```Elixir
import Helpers.Format
```
then you can use all the func from the module:
```Elixir
def new(name, age) do
    formatted_name = trim_text(name)
    %{name: formatted_name, age: age}
  end
```

### use alias
- create alias are useful
- usually don't use the as: XXX

to use alias:
```Elixir 
alias Helpers.Format 
#then you can use Format.trim_text()
#when not using as: the last word is the alias
#this is best practice to use it this way.
```


## Module attributes

using constant in like:
- base_url you will use a lot
- storing long func call
- document the code
	- good for vscode integration
	- can use with h

the code can be more clean with that.

Important thing:
If I over the mouse over the code it will show my documentation I wrote.


## Pipe operator

`|>` <-- is pipe operator

pretty useful, can work inline or under each other and you can add multiple pipe. 


## Debugging

most simple:
```Elixir
IO.inspect()
```

another nice one:
It prints out the result of the command ran before the dbg so you it's better to add it at the end of the function to see everything.

```Elixir
dbg()

#result:
iex(5)> Helpers.Format.generate_slug(" USER   NAME    ")
[(tutorial 0.1.0) lib/helpers/format.ex:17: Helpers.Format.generate_slug/1]
text #=> " USER   NAME    "
|> String.trim() #=> "USER   NAME"

"user---name"
```

another usage of dbg:
instead of launching iex with : 
```Elixir  
	iex -S mix
```
launch it with: 
``` Elixir
	 iex --dbg pry -S mix
```

It will stop the code where your `dbg()` is.

If you want the code to continue write `continue` or `c` in the iex to go ahead.

## Pattern matching

``` 
a = 2 <-- is pattern matching
pattern = expression
```
useful to find or extract specific pattern and when we use bigger data structure

example:
we create a tuple with a name and age:
```Elixir
iex(2)> user = {"Toine", 24}
```
now we want to retreive those data:
```Elixir 
iex(3)> {name, age} = user
{"toine", 25}
```

the result of the operation  is result of the expression on the right side.

We have extracted a pattern from the user variable and we have attribute to var age and name:
```Elixir 
iex(4)> name
"Daniel"
iex(5)> age
26
```

useful to extract variables and constant.

```Elixir 
{"toine", age2} = user
{"toine", 25}

```

this is very powerful

we can pattern matching on any type of variable.

``` 
[_,_,_] = list

_ variable means we don't want to save them just use them right now.

```

```Elixir
iex(11)> [head|taail] = list 
[1, 2, 3]
iex(12)> head
1
iex(13)> taail
[2, 3]
```

this is **really really** powerful

extract pattern from map:
```Elixir 
ex(1)> map = %{name: "toine", age: 25}
%{name: "toine", age: 25}
iex(2)> %{name: name_var, age: age_var} = map
%{name: "toine", age: 25}
iex(3)>
```

this is verbose.  but there isn't any shortend for those functions. 

pattern matching in functions:

```Elixir
def new("toine", age) do
    %{name: "toine", age: age, is_cool: true}
  end

  def new(name, age) do
    formatted_name = trim_text(name)
    %{name: formatted_name, age: age, is_cool: false}
  end

```

result:
```Elixir 
iex(4)> Users.new "toine", 25
%{name: "toine", age: 25, is_cool: true}
iex(5)> Users.new "antoine", 25
%{name: "antoine", age: 25, is_cool: false}
```

we can have same function with same amount of arrity (the /1,2,3...)
but we need to put the smaller one (or the one who don't match a lot of criteria before the big one.)


## Guards 

this is an extensions of pattern matching
this is extra help 

example:
new attribute in the map `can_drink` if the user isn't 16yo he can't drink how can we do it ?

we use guards along side pattern matching. 

its simple, on the generic function add this between the end of the arguments and the do:
```Elixir 
def new(name, age) **when age >= 16**  do
    formatted_name = trim_text(name)
    %{name: formatted_name, age: age, is_cool: false, can_drink: false}
  end
```

but yeah it won't work because we haven't a general case for this condition.

so we need to add the case if the user age is smaller than 16:
```Elixir 
  def new(name, age) when age <= 16 do
    formatted_name = trim_text(name)
    %{name: formatted_name, age: age, is_cool: false, can_drink: true}
  end

```

```Elixir 
iex(8)> Users.new "antoine", 12
%{name: "antoine", age: 12, is_cool: false, can_drink: false}
iex(9)>

```

guards are really useful

cannot use custom functions in guards.

## Conditionals

another form of if:
instead of if not you can use `unless`

another way to do multiple if/else you can use `cond do`

Example you have this:
```Elixir
if(!game.in_stock) do
      {:error, "Game is not in stock"}
    else
      if(game.price > 12) do
        {:error, "Too expensive, can't buy"}
      else
        {:ok, "Proceed with the purchase"}
      end
    end
```

lot of if/else not looking good and taking a lot of lines. 

Here is with `cond do`:

```Elixir
cond do
      !game.in_stock -> {:error, "Game is not in stock"}
      game.price > 12 -> {:error, "Too expensive, can't buy"}
      true -> {:ok, "Proceed with the purchase"}
    end
    #true -> is for returning something when it's true

```

maybe not easier to read at first but after you understand what cond do is, it makes your life easier. 

## Case 

you can do pattern matching on a function with case:
```Elixir
  def purchase(game) do
    case validate_purchase(game) do
      {:error, reason} -> "Error: #{reason}"
      {:ok, _} -> "Game bought successfully!"
    end
  end
```

## Recursion

traditional for loops don't work in elixir.
Even if there is Enum.Map or Enum.Each there is recursion underneath. 

don't forget elixir variables are immutable.

recursion it's when you call the function itself multiple time until you reach goal. 

## Enums

maps, list are enums

to use each, map or filter.  you need to use the module `Enum`

so this is the structure for enums:
```Elixir
Enum.<filter | map | each >(<list | map>, fn varName -> <condition here> end)
```

real example: 
```Elixir
def filter_games(game_list) do
    Enum.filter(game_list, fn game -> game.in_stock && game.price <= 50 end)
  end
```

## Anonymous function

 function without a name that you can use right away.
 like a callback in js 

you can break it on multiple lines

there is a shorter syntax with capture operator.

you can simplify the example from #Enums:
```Elixir
def filter_games(game_list) do
    Enum.filter(game_list, fn game -> game.in_stock && game.price <= 50 end)
  end
```
will become:
```Elixir
def filter_games(game_list) do
    Enum.filter(game_list, &(&1.in_stock && &1.price <= 50 end))
  end
```

and if there is mutiple parameter you can do `&2,&3,&4,...`
the parentheses are optional but elixir-ls add them for better readability.

but this won't work on a big function.

you can call a named function:
we have this named function
```Elixir
defp filter(game) do
    game.in_stock && game.price <= 50
  end
```
we will use it this way:
```Elixir
def filter_games(game_list) do
    Enum.filter(game_list, &filter/1)
  end
```

so `&<function name>/arity`

## Struct

at the top of your module you write your `defstruct`:
```Elixir 
defmodule Users do
  defstruct [:name, :email]
  ...
end
```
So now if I write `%Users{name:"Toine, is_admin:true}`
I will receive an error because `is_admin` is not a struct used in our module

but if I don't write the email then it will works too.

### Default value

you can also give default value:
```Elixir 
defmodule Users do
  defstruct name:"Toine", email:"toine@toto.ch"
  ...
end
```

### Specific value

On top of defstruct you can write `@enforce_keys`
```Elixir
defmodule Users do
  @enforce_keys [:name]
  defstruct [:name, :email]
  ...
end
```

If you want to check if a var is the correct struct you can do this:
```Elixir 
defmodule Users do
  @enforce_keys [:name]
  defstruct [:name, :age, :is_cool, :can_drink]
  # second method
  import Helpers.Format

  def check(%Users{} = _), do: true
  def check(_), do: false
end
```

I can use like that:
```Elixir
iex(26)> user1 = %Users{name: "daniel", age: nil, is_cool: nil, can_drink: nil }
%Users{name: "daniel", age: nil, is_cool: nil, can_drink: nil}
iex(27)> Users.check user1
true
iex(18)> user2 = %{name: "Toine", email: "toine@at.ch"}
%{name: "Toine", email: "toine@at.ch"}
iex(28)> Users.check user2
false
iex(29)> Users.check user1
true
```

## Unit testing #ExUnit

You can use mix test to launch test
`.exs` this is a script you don't want your test to be build

you need to use `use ExUnit.Case`
use = using a macro, injecting code from somewhere else

you can run doctest to check your code in the documentation

assert for truthy value
refute for falsy value

context = way to give context to data
callbacks = something you want to run before a test or each test
use `setup or setup_all (to run before all tests) do end`

pattern matching

run `mix test --cover`to check coverage of tests

## Thanks

Thanks to Daniel Bergholz for this amazing series of videos about elixir. Now time to learn phoenix !
[the playlist](https://www.youtube.com/watch?v=Q0Z1jqv6LW0&list=PLbV6TI03ZWYVQEC_Txq_cV0Uy_s16b0d3)



