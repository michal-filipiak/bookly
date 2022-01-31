package com.example.Tuesday_Bookly.services;

import com.example.Tuesday_Bookly.dao.BookingRepository;
import com.example.Tuesday_Bookly.dao.UserRepository;
import com.example.Tuesday_Bookly.enums.ItemTypeEnum;
import com.example.Tuesday_Bookly.exceptions.BookingValidationException;
import com.example.Tuesday_Bookly.models.User;
import com.example.Tuesday_Bookly.models.bookings.*;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.ZoneOffset;
import java.util.*;

@Slf4j
@Service
public class BookingService implements BookingClient{

    @Autowired
    BookingRepository bookingRepository;
    UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository)
    {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

//    private boolean isValidBooking(BookingCrudModel booking)
//    {
//        if (booking != null)
//        {
//            Optional<Booking> dbBooking = bookingRepository.findById(booking.getItemId());
//            if (dbBooking.isPresent())
//            {
//                log.error("Booking already exists");
//                throw new BookingValidationException("Booking already exists");
//            }
//        }
//        return true;
//    }

    @Override
    public BookingDTO addBooking(BookingCrudModel model, String token)
    {

        log.info("Booking is valid");


        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        User user = userRepository.findBySecurityToken(token).get();
        BookingDTO booking = new BookingDTO();


        switch (model.getItemType())
        {
            case Car:
            {
                headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkxMjMiLCJleHAiOjE2NDM2NDcyNDcsImlhdCI6MTY0MzU2MDg0N30.dVX5tyVtmigVBTYfaYUKW3R3I6TS9_LusQOdAUvGexIM-b5jVD_YlmfdaMg2YhAZ85937kZJnVXsRGYutFdZkw");
                headers.setContentType(MediaType.APPLICATION_JSON);
                JSONObject body = new JSONObject();
                body.put("firstName", user.getFirstName());
                body.put("lastName", user.getLastName());
                body.put("startDate", model.getStartDate().toString());
                body.put("endDate", model.getEndDate().toString());
                body.put("status", 1);

                HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
                String url = UriComponentsBuilder
                        .fromHttpUrl("https://pw2021-carly-backend.azurewebsites.net/V1/cars/" + model.getItemId() + "/orders")
                        .toUriString();

                ResponseEntity<CarlyBookingModel> response = restTemplate.exchange(url, HttpMethod.POST, entity, CarlyBookingModel.class);
                booking.setItemType(ItemTypeEnum.ItemType.Car);
                booking.setStartDateTime(model.getStartDate());
                booking.setEndDateTime(model.getEndDate());
                booking.setOwner(user);
                booking.setExternBookingId(response.getBody().getOrderId());
                booking.setActive(true);
                break;
            }
            case ParkingSlot:
            {

                headers.set("security-header", "a2622aca-27f8-431d-bc53-a4a4fd11a7e6");
                headers.setContentType(MediaType.APPLICATION_JSON);
                JSONObject body = new JSONObject();
                body.put("firstName", user.getFirstName());
                body.put("lastName", user.getLastName());
                body.put("startDateTime", model.getStartDate().atZone(ZoneOffset.UTC).toString());
                body.put("endDateTime", model.getEndDate().atZone(ZoneOffset.UTC).toString());
                body.put("active", 1);
                body.put("parkingSlot", model.getItemId());
                body.put("ownerId", user.getId());

                HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
                String url = UriComponentsBuilder
                        .fromHttpUrl("https://parkly-2022.azurewebsites.net/bookings")
                        .toUriString();

                ResponseEntity<ParklyBookingModel> response = restTemplate.exchange(url, HttpMethod.POST, entity, ParklyBookingModel.class);
                booking.setItemType(ItemTypeEnum.ItemType.ParkingSlot);
                booking.setStartDateTime(model.getStartDate());
                booking.setEndDateTime(model.getEndDate());
                booking.setOwner(user);
                booking.setExternBookingId(response.getBody().getId());
                booking.setActive(true);
                break;
            }
            case Flat:
            {
                headers.set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib29rbHkiLCJleHAiOjE2NDM3MTY5OTcsImlhdCI6MTY0MzYzMDU5N30.oONcm_cLgH8ZfNDinPe1RkLUHJXYqpEbg7gcx5ZW0Yz-BQ1UQgd9mmfUm2s05m3OYccDVg45GIxQLMDx33Vnsg");
                headers.setContentType(MediaType.APPLICATION_JSON);
                JSONObject body = new JSONObject();
                body.put("flat", model.getItemId());
                body.put("bookedFrom", model.getStartDate().toString());
                body.put("bookedTo", model.getEndDate().toString());

                HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
                String url = UriComponentsBuilder
                        .fromHttpUrl("https://pw-flatly.herokuapp.com/api/bookings")
                        .toUriString();

                ResponseEntity<FlatlyBookingModel> response = restTemplate.exchange(url, HttpMethod.POST, entity, FlatlyBookingModel.class);
                booking.setItemType(ItemTypeEnum.ItemType.Flat);
                booking.setStartDateTime(model.getStartDate());
                booking.setEndDateTime(model.getEndDate());
                booking.setOwner(user);
                booking.setExternBookingId(response.getBody().getFlat());
                booking.setActive(true);
                break;
            }
        }



        bookingRepository.save(booking);
        log.info("Booking with id {} saved", booking.getId());
        return booking;
    }

    @Override
    public BookingDTO updateBooking(long id, BookingDTO booking)
    {
        BookingDTO result = new BookingDTO();
        if (bookingRepository.existsById(id))
        {
            booking.setId(id);
            result = bookingRepository.save(booking);
            log.info("Booking with id {} updated", booking.getId());
        }

        return result;
    }

    @Override
    public boolean deleteBooking(long id)
    {
        boolean deleted = false;
        if (bookingRepository.existsById(id))
        {
            bookingRepository.deleteById(id);
            log.info("Booking with id {} deleted", id);
            deleted = true;
        }

        return deleted;
    }

    @Override
    public Page<BookingDTO> getBookings(Optional<Integer> typeFilter, Optional<String> loginFilter,
                                        String order, int pageNum, int pageSize)
    {
        order.toUpperCase(Locale.ROOT);
        if (order.equals("ASC"))
        {
            return bookingRepository.findAllByItemTypeAndOrLoginASC(typeFilter, loginFilter, PageRequest.of(pageNum, pageSize));
        }
        else if (order.equals("DESC"))
        {
            return bookingRepository.findAllByItemTypeAndOrLoginDESC(typeFilter, loginFilter, PageRequest.of(pageNum, pageSize));
        }




        log.error("Incorrect ordering parameter");
        throw new IllegalArgumentException("Incorrect ordering parameter");
    }

    @Override
    public List<BookingDTO> getBookingsForUser(String token)
    {
        List<BookingDTO> bookings;
        return bookingRepository.findAllByOwnerSecurityToken(token);
    }

    @Override
    public Optional<BookingDTO> getBooking(long id)
    {
        Optional<BookingDTO> booking = bookingRepository.findById(id);
        if(booking.isPresent())
            return booking;

        log.info("Booking doesn't exist");
        throw new BookingValidationException("Booking doesn't exist.");
    }

}
