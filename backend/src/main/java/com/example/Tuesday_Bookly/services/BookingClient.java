package com.example.Tuesday_Bookly.services;
import com.example.Tuesday_Bookly.enums.ItemTypeEnum;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import com.example.Tuesday_Bookly.models.bookings.BookingCrudModel;

import java.util.List;
import java.util.Optional;

public interface BookingClient
{
    BookingDTO addBooking(BookingCrudModel booking, String token);
    BookingDTO updateBooking(long id, BookingDTO booking);
    boolean deleteBooking(long id);

    List<BookingDTO> getBookings(Optional<Integer> typeFilter, Optional<String> loginFilter);
    List<BookingDTO> getBookingsForUser(String token);
    Optional<BookingDTO> getBooking(long id);
}
