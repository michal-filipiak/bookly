package com.example.Tuesday_Bookly.controller;

import com.example.Tuesday_Bookly.enums.ItemTypeEnum;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import com.example.Tuesday_Bookly.models.bookings.BookingCrudModel;
import com.example.Tuesday_Bookly.security.services.SecurityService;
import com.example.Tuesday_Bookly.services.BookingClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public BookingController(BookingClient bookingClient, SecurityService securityService)
    {
        this.securityService = securityService;
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
    public ResponseEntity<Page<BookingDTO>> getBookings(@RequestHeader HttpHeaders headers, @RequestParam Optional<Integer> typeFilter,
                                                        @RequestParam Optional<String> loginFilter, @RequestParam int pageNum, @RequestParam int pageSize,
                                                        @RequestParam String order)
    {
        if(securityService.Authenticate(headers))
        {
            Page<BookingDTO> bookings = bookingClient.getBookings(typeFilter, loginFilter, order, pageNum, pageSize);
            return ResponseEntity.ok(bookings);
        }

        return new ResponseEntity<Page<BookingDTO>>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path = "/user")
    public ResponseEntity<List<BookingDTO>> getBookingsForUser(@RequestHeader HttpHeaders headers)
    {
        if(securityService.Authenticate(headers))
        {
            String token = headers.getFirst("Authorization");
            List<BookingDTO> bookings = bookingClient.getBookingsForUser(token);
            return ResponseEntity.ok(bookings);
        }

        return new ResponseEntity<List<BookingDTO>>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<BookingDTO> getBooking(@RequestHeader HttpHeaders headers, @PathVariable("id") long id)
    {
        if(securityService.Authenticate(headers))
        {
            BookingDTO booking = bookingClient.getBooking(id).get();
            return ResponseEntity.ok(booking);
        }
            return new ResponseEntity<BookingDTO>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers, @PathVariable("id") long id)
    {
        if(securityService.Authenticate(headers))
        {
            return bookingClient.deleteBooking(id)
                    ? ResponseEntity.ok("Booking deleted")
                    : ResponseEntity.badRequest().body(String.format("Booking with id %s does not exist.", id));
        }

        return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@RequestHeader HttpHeaders headers, @PathVariable long id,
                                                    @RequestBody BookingDTO booking)
    {
        if(securityService.Authenticate(headers))
        {
            BookingDTO result = bookingClient.updateBooking(id, booking);
            return result.equals(new BookingDTO())
                    ? ResponseEntity.badRequest().body(booking)
                    : ResponseEntity.ok(result);
        }

        return new ResponseEntity<BookingDTO>(HttpStatus.UNAUTHORIZED);
    }

}