import { Service } from "typedi";
import Subject from "../entity/Subject";

@Service()
export default class SubjectService {
  async addSubject(subject: string) {
    return await Subject.save(new Subject(subject));
  }
}