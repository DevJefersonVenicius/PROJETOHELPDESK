import { PartialType } from "@nestjs/mapped-types";
import { CreateCallDTO } from "./create-call-dto";

export class UpdatePatchCallDTO extends PartialType(CreateCallDTO) {}
