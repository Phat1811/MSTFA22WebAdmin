import { Grade } from './grade.model';
import { Subjects } from './subject.model';
import { Gender } from './gender.model';
export interface Tutor {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    gender: Gender;
    subjects: Subjects[];
    grades: Grade[];
    bio: string;
    price: number;
    status: boolean;
}
