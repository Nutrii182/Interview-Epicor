import { HttpInterceptorFn } from '@angular/common/http';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const editedReq = req.clone({
    setHeaders: {
      'X-ERP-APP': 'testing'
    }
  });
  return next(editedReq);
};
