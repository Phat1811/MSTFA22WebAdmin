import { Grade } from './grade.model';
import { Subject } from './subject.model';
import { Gender } from './gender.model';
export interface Tutor {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    gender: Gender;
    subjects: Subject[];
    grades: Grade[];
    bio: string;
    price: number;
    status: boolean;
}
