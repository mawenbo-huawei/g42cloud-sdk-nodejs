import { ServerResponseException } from "../../exception/ServerResponseException";
import { ClientRequestException } from "../../exception/ClientRequestException";
import { ExceptionResponse } from "../../exception/ExceptionResponse";
import { ExceptionUtil } from "../../exception/ExceptionUtil";
import { ServiceResponseException } from "../../exception/ServiceResponseException";

describe("Exception handling", () => {
    const isClientError = (status: number) => status >= 400 && status < 500;
    const isServerError = (status: number) => status >= 500;

    it("should create ClientRequestException", () => {
        const exception: ExceptionResponse = {
            data: {
                error_code: "400",
                error_msg: "Bad Request",
                encoded_authorization_message: "abc123",
            },
            status: 400,
            message: "Bad Request",
        };

        const result: ClientRequestException = ExceptionUtil.generalException(exception);
        expect(isClientError(result.httpStatusCode as number)).toBe(true);

        expect(result.encodedAuthorizationMessage).toEqual("abc123")
    });

    it("should create ServerResponseException", () => {
        const exception: ExceptionResponse = {
            data: {
                error: {
                    code: "500",
                    message: "Internal Server Error",
                    encoded_authorization_message: "xyz789",
                },
            },
            status: 500,
            message: "Internal Server Error",
        };

        const result: ServerResponseException = ExceptionUtil.generalException(exception);
        expect(isServerError(result.httpStatusCode as number)).toBe(true);
        expect(result.encodedAuthorizationMessage).toEqual("xyz789")
    });

    it("should create ServiceResponseException", () => {
        const exception: ExceptionResponse = {
            data: {
                error_code: "100",
                error_msg: "Unknown Error",
                encoded_authorization_message: "qwe456",
            },
            status: 100,
            message: "Unknown Error",
        };

        const result: ServiceResponseException = ExceptionUtil.generalException(exception);
        expect(
            isClientError(result.httpStatusCode as number) ||
            isServerError(result.httpStatusCode as number)
        ).toBe(false);
    });
});
