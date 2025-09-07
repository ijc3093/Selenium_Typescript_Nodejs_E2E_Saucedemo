// src/types/user.ts

/**
 * Defines the structure for a user object in the test suite.
 * This provides type safety for user credentials.
 */
export type User = {
    username: string;
    password: string;
};

/**
 * A collection of known users used for testing the Sauce Labs demo application.
 * This makes the test data easily accessible and centralized.
 */
export const USERS = {
    STANDARD_USER: {
        username: 'standard_user',
        password: 'secret_sauce',
    } as User,

    LOCKED_OUT_USER: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    } as User,

    PROBLEM_USER: {
        username: 'problem_user',
        password: 'secret_sauce',
    } as User,

    PERFORMANCE_GLITCH_USER: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
    } as User,
};