export interface Activity {
  activityId: number;
  activityName: string;
  description: string | null;
  imagePath: string | null;
  location: string;
  durationMinutes: number;
  pricePerPerson: number;
  maxCapacity: number;
  isActive: boolean;
  timesbooked?: number;
}

export interface ActivityReview {
  reviewid: number;
  rating: number;
  comment: string | null;
  reviewdate: string;
  touristname: string;
  touristsurname: string;
}

export interface Booking {
  bookingid: number;
  touristid: number;
  activityid: number;
  tourguideid: number | null;
  adminid: number | null;
  bookingdate: string;
  starttime: string;
  endtime: string;
  numberofpeople: number;
  totalamount: number;
  bookingstatus: string;
  createddate: string;
  activityname?: string;
  guidename?: string;
  touristname?: string;
  touristsurname?: string;
}

export interface TourGuide {
  tourGuideId: number;
  name: string;
  specialization: string;
  isActive: boolean;
}

export interface Tourist {
  touristId: number;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  createdDate: string;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  role: 'TOURIST' | 'ADMIN';
  userId: number;
  name: string;
}