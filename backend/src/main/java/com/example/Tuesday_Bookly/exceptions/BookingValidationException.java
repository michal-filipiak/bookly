package com.example.Tuesday_Bookly.exceptions;

public class BookingValidationException extends RuntimeException{
    public BookingValidationException(String message)
    {
        super(message);
    }
}
