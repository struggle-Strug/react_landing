export const BACKEND_URL =
    '__env__' in window ? window.__env__.BACKEND_URL : "https://staging-backend.heart-beat.me/";
    
export const LOGIN_ENDPOINT = BACKEND_URL + 'api/auth/jwt/create/'

export const REFRESH_ENDPOINT = BACKEND_URL + 'api/auth/jwt/refresh/'

export const VERIFY_ENDPOINT = BACKEND_URL + 'api/auth/jwt/verify/'

export const RESET_ENDPOINT = BACKEND_URL + 'api/password/reset/?'

export const FORGOT_ENDPOINT = BACKEND_URL + 'api/password/forgot/'

export const EVALUATION_ENDPOINT = BACKEND_URL + 'api/evaluation/'

export const EVALUATIONS_ENDPOINT = BACKEND_URL + 'api/evaluations/'

export const ANSWER_ENDPOINT = BACKEND_URL + 'api/answer/'

export const SCORE_ENDPOINT = BACKEND_URL + 'api/score/'

export const TEAM_ENDPOINT = BACKEND_URL + 'api/score/team/new_list/'

export const MEMBER_ENDPOINT = BACKEND_URL + 'api/user/'

export const COMPANY_ENDPOINT = BACKEND_URL + 'api/company/'

export const ASSIGN_ENDPOINT = BACKEND_URL + 'api/random/'

export const SUBSCRIPTION = BACKEND_URL + 'api/subscription/'

export const USERANSWER_ENDPOINT = BACKEND_URL + 'api/useranswers_new/'

export const USERANSWER_OTHER_ENDPOINT = BACKEND_URL + 'api/useranswers_other/'

export const USERANSWER_UPDATE_ENDPOINT = BACKEND_URL + 'api/answer/update/'

export const PRODUCTIVITY_ENDPOINT = BACKEND_URL + 'api/productivity_trend/'
