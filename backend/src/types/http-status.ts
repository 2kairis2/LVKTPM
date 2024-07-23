/* eslint-disable no-unused-vars */
export enum HttpStatus {
    // 1xx Informational
    CONTINUE = 100, // The initial part of a request has been received and has not yet been rejected by the server.
    SWITCHING_PROTOCOLS = 101, // The server understands and is willing to comply with the client's request to switch protocols.

    // 2xx Success
    OK = 200, // The request has succeeded.
    CREATED = 201, // The request has been fulfilled and has resulted in one or more new resources being created.
    ACCEPTED = 202, // The request has been accepted for processing, but the processing has not been completed.
    NO_CONTENT = 204, // The server successfully processed the request, but is not returning any content.

    // 3xx Redirection
    MOVED_PERMANENTLY = 301, // The requested resource has been assigned a new permanent URI.
    FOUND = 302, // The requested resource resides temporarily under a different URI.
    NOT_MODIFIED = 304, // The resource has not been modified since the last request.

    // 4xx Client Error
    BAD_REQUEST = 400, // The server could not understand the request due to invalid syntax.
    UNAUTHORIZED = 401, // The request requires user authentication.
    FORBIDDEN = 403, // The server understood the request, but it refuses to authorize it.
    NOT_FOUND = 404, // The server can't find the requested resource.
    METHOD_NOT_ALLOWED = 405, // The request method is known by the server but is not supported by the target resource.
    CONFLICT = 409, // The request could not be completed due to a conflict with the current state of the resource.
    UNPROCESSABLE_ENTITY = 422, // The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
    TOO_MANY_REQUESTS = 429, // The user has sent too many requests in a given amount of time.

    // 5xx Server Error
    INTERNAL_SERVER_ERROR = 500, // The server encountered an unexpected condition that prevented it from fulfilling the request.
    NOT_IMPLEMENTED = 501, // The server does not support the functionality required to fulfill the request.
    BAD_GATEWAY = 502, // The server, while acting as a gateway or proxy, received an invalid response from an inbound server.
    SERVICE_UNAVAILABLE = 503, // The server is currently unable to handle the request due to temporary overloading or maintenance of the server.
    GATEWAY_TIMEOUT = 504, // The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.
}
