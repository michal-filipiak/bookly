package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import com.example.Tuesday_Bookly.models.bookings.BookingCrudModel;
import com.example.Tuesday_Bookly.security.services.SecurityService;
import com.example.Tuesday_Bookly.services.BookingClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping(path = "/bookings")
public class BookingController
{
    protected final BookingClient bookingClient;

    @Autowired
    private SecurityService securityService;

    @Autowired
    public BookingController(BookingClient bookingClient){
        this.bookingClient = bookingClient;
    }

    @PostMapping(path = "")
    public ResponseEntity<BookingDTO> createBooking(@RequestHeader HttpHeaders headers, @RequestBody BookingCrudModel model)
    {
        if (securityService.Authenticate(headers))
        {
            BookingDTO booking = bookingClient.addBooking(model, headers.getFirst("Authorization"));
            return ResponseEntity.ok(booking);
        }

        return new ResponseEntity<BookingDTO>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path = "")
    public ResponseEntity<List<BookingDTO>> getBookings(@RequestHeader HttpHeaders headers, @RequestParam Optional<String> filter) //for now: filter == active || inactive
    {
        if(securityService.Authenticate(headers)){
            List<BookingDTO> bookings = bookingClient.getBookings(filter);
            return ResponseEntity.ok(bookings);
        }
        else{
            return new ResponseEntity<List<BookingDTO>>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<BookingDTO> getBooking(@RequestHeader HttpHeaders headers, @PathVariable("id") long id)
    {
        if(securityService.Authenticate(headers)){
            BookingDTO booking = bookingClient.getBooking(id).get();
            return ResponseEntity.ok(booking);
        }
        else{
            return new ResponseEntity<BookingDTO>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,@PathVariable("id") long id)
    {
        if(securityService.Authenticate(headers)){
            return bookingClient.deleteBooking(id)
                    ? ResponseEntity.ok("Booking deleted")
                    : ResponseEntity.badRequest().body(String.format("Booking with id %s does not exist.", id));
        }
        else{
            return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@RequestHeader HttpHeaders headers, @PathVariable long id,
                                                    @RequestBody BookingDTO booking)
    {
        if(securityService.Authenticate(headers)){
            BookingDTO result = bookingClient.updateBooking(id, booking);
            return result.equals(new BookingDTO())
                    ? ResponseEntity.badRequest().body(booking)
                    : ResponseEntity.ok(result);
        }
        else{
            return new ResponseEntity<BookingDTO>(HttpStatus.UNAUTHORIZED);
        }
    }

}