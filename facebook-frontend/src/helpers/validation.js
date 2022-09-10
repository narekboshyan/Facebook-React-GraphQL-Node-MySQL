import { SNACKBAR_TYPE, ERROR_TYPES, USER_TYPE } from 'constants/index';
import { addSnackbar } from 'redux/slices/shared';
import { emailValidation } from 'utils';

export const userDataValidation = (
  dispatch = () => {},
  setInvalidField = () => {},
  firstName,
  lastName,
  email,
  userType,
  companyValues,
  isValidCompanyNames,
  isValidCompanyData,
  permissionIsValid,
  submitHandler
) => {
  if (!firstName) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'First name can not be empty'
      })
    );
    setInvalidField(ERROR_TYPES.firstName);
    return;
  }
  if (!lastName) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Last name  can not be empty'
      })
    );
    setInvalidField(ERROR_TYPES.lastName);
    return;
  }
  if (!email) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Email can not be empty'
      })
    );
    setInvalidField(ERROR_TYPES.email);
    return;
  }
  if (emailValidation(email)) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Email is not valid'
      })
    );
    setInvalidField(ERROR_TYPES.email);
    return;
  }

  if (!userType) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'User type can not be empty'
      })
    );
    setInvalidField(ERROR_TYPES.userType);
    return;
  }

  if (userType === USER_TYPE && !companyValues.length) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Company values can not be empty'
      })
    );
    return;
  }

  if (userType === USER_TYPE && (!isValidCompanyNames || !isValidCompanyData)) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Company name(s) are invalid'
      })
    );
    return;
  }

  if (userType === USER_TYPE && !permissionIsValid) {
    dispatch(
      addSnackbar({
        type: SNACKBAR_TYPE.error,
        message: 'Each company should have at least 1 permission'
      })
    );
    return;
  }
  submitHandler();
};
