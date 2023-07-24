import { getBooking } from '../factories';
import bookingService from '@/services/booking-service';
import bookingRepository from '@/repositories/booking-repository';

describe('Booking Service Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get Booking test', () => {
    it('Shoud return bookin by userId', async () => {
      const userId = 1;
      const booking = await getBooking();

      jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(booking);

      const result = await bookingService.getBookingByUserId(userId);

      expect(bookingRepository.findBookingByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(booking);
    });

    it('shoud return notFound if booking id not found', async () => {
      const userId = 1;

      jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(null);

      const result = bookingService.getBookingByUserId(userId);

      expect(result).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });
  });

  /*describe('postBookingRoom', () => {
    it('Shoud create a booking by userId and roomId', async () => {
      const userId = 1;
      const roomId = 1;
      const booking = await getBooking();

      jest.spyOn(bookingService, 'verifyEnrollment').mockResolvedValue(undefined);
      jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollmentWithAddressReturn());
      jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticketByEnrollmentIdReturn());

      jest.spyOn(bookingService, 'verifyValidBooking').mockResolvedValue(undefined);
      jest.spyOn(roomRepository, 'findRoomByRoomId').mockResolvedValue(getRoomByRoomIdReturn());
      jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(getBookingByRoomIdReturn());
      jest.spyOn(bookingRepository, 'createBookingRoom').mockResolvedValue(booking);
      const result = await bookingService.postBookingRoom(userId, roomId);
      expect(result).toEqual(booking);
    });
  });*/
});
