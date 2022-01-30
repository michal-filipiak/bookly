package com.example.Tuesday_Bookly.exceptions;

public class UserValidationException extends RuntimeException
{
    public UserValidationException(String message)
    {
        super(message);
    }
}
