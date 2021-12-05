import {FeedbackDetailsModel} from './feedback-details.model';

export class ContactUsModel {
  type: string;
  message: string;
  userEmail?: string;
  user?: string;
  status?: string;
  feedbackDetails?: FeedbackDetailsModel[];
}
