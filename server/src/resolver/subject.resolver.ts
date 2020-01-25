import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Inject } from "typedi";
import SubjectService from "../service/subject.service";
import Subject from "../entity/Subject";

@Resolver()
export class SubjectResolver {

  @Inject()
  private readonly subjectService: SubjectService;

  @Query(() => [Subject])
  async getAll() {
    return await Subject.find();
  }

  @Mutation(() => Subject)
  async addSubject(@Arg("subject") subject: string): Promise<Subject> {
    return await this.subjectService.addSubject(subject);
  }
}