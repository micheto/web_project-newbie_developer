@echo off

setlocal enabledelayedexpansion

mode 30,10

:Calc

echo add = +

echo subtract = -

echo divide = /

echo multiply = *

echo input your question here 

set /p equ=

set /a equ=!equ!

cls

echo answer=!equ!

pause 
gotocalc