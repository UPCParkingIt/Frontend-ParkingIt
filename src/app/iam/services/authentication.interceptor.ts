import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from "@angular/common/http";

/**
 * Authorization Interceptor
 * @summary
 * This interceptor is used to add the Authorization header to the request. The token is retrieved from the local storage.
 */
export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedRequest);
  }

  return next(req);
};
