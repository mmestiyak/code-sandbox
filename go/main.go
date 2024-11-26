package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println("hello world")
	result, error := multiply(0, 32.5)
	if error != nil {
		fmt.Print(error.Error())
	}
	fmt.Printf("The Result is very %v ", result)
}

func multiply(num1 float32, num2 float32) (result float32, err error) {
	var errs error
	if num1 == 0 {
		errs = errors.New("Num1 is not defined")
		return 0, errs
	}
	multiplication := num1 * num2
	return multiplication, err
}
