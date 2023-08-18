import type { Static } from '@feathersjs/typebox';
import type { HookContext } from '../../declarations';
export declare const userSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    email: import("@sinclair/typebox").TString<"email">;
    password: import("@sinclair/typebox").TString<string>;
    name: import("@sinclair/typebox").TString<string>;
    isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    created_at: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
}>;
export type User = Static<typeof userSchema>;
export declare const userValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const userResolver: import("@feathersjs/schema").Resolver<{
    isOrganisationUser?: boolean | undefined;
    created_at?: string | undefined;
    id: number;
    name: string;
    email: string;
    password: string;
}, HookContext>;
export declare const userExternalResolver: import("@feathersjs/schema").Resolver<{
    isOrganisationUser?: boolean | undefined;
    created_at?: string | undefined;
    id: number;
    name: string;
    email: string;
    password: string;
}, HookContext>;
export declare const userDataSchema: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    email: import("@sinclair/typebox").TString<"email">;
    password: import("@sinclair/typebox").TString<string>;
    name: import("@sinclair/typebox").TString<string>;
    isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    created_at: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
}>, ["email", "password", "name", "isOrganisationUser"]>;
export type UserData = Static<typeof userDataSchema>;
export declare const userDataValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const userDataResolver: import("@feathersjs/schema").Resolver<{
    isOrganisationUser?: boolean | undefined;
    created_at?: string | undefined;
    id: number;
    name: string;
    email: string;
    password: string;
}, HookContext>;
export declare const userPatchSchema: import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    email: import("@sinclair/typebox").TString<"email">;
    password: import("@sinclair/typebox").TString<string>;
    name: import("@sinclair/typebox").TString<string>;
    isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    created_at: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
}>>;
export type UserPatch = Static<typeof userPatchSchema>;
export declare const userPatchValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const userPatchResolver: import("@feathersjs/schema").Resolver<{
    isOrganisationUser?: boolean | undefined;
    created_at?: string | undefined;
    id: number;
    name: string;
    email: string;
    password: string;
}, HookContext>;
export declare const userQueryProperties: import("@sinclair/typebox").TPick<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    email: import("@sinclair/typebox").TString<"email">;
    password: import("@sinclair/typebox").TString<string>;
    name: import("@sinclair/typebox").TString<string>;
    isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    created_at: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString<"date-time">>;
}>, ["id", "name", "isOrganisationUser"]>;
export declare const userQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TObject<{
    $limit: import("@sinclair/typebox").TNumber;
    $skip: import("@sinclair/typebox").TNumber;
    $sort: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    $select: import("@sinclair/typebox").TUnsafe<("id" | "name" | "isOrganisationUser")[]>;
    $and: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TNumber;
            $gte: import("@sinclair/typebox").TNumber;
            $lt: import("@sinclair/typebox").TNumber;
            $lte: import("@sinclair/typebox").TNumber;
            $ne: import("@sinclair/typebox").TNumber;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TString<string>;
            $gte: import("@sinclair/typebox").TString<string>;
            $lt: import("@sinclair/typebox").TString<string>;
            $lte: import("@sinclair/typebox").TString<string>;
            $ne: import("@sinclair/typebox").TString<string>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
    }>>, import("@sinclair/typebox").TObject<{
        $or: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TNumber;
                $gte: import("@sinclair/typebox").TNumber;
                $lt: import("@sinclair/typebox").TNumber;
                $lte: import("@sinclair/typebox").TNumber;
                $ne: import("@sinclair/typebox").TNumber;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TString<string>;
                $gte: import("@sinclair/typebox").TString<string>;
                $lt: import("@sinclair/typebox").TString<string>;
                $lte: import("@sinclair/typebox").TString<string>;
                $ne: import("@sinclair/typebox").TString<string>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
            isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
                $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
                $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            }>, import("@sinclair/typebox").TObject<{
                [key: string]: import("@sinclair/typebox").TSchema;
            } | undefined>]>>]>>;
        }>>>;
    }>]>>;
    $or: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TNumber;
            $gte: import("@sinclair/typebox").TNumber;
            $lt: import("@sinclair/typebox").TNumber;
            $lte: import("@sinclair/typebox").TNumber;
            $ne: import("@sinclair/typebox").TNumber;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TString<string>;
            $gte: import("@sinclair/typebox").TString<string>;
            $lt: import("@sinclair/typebox").TString<string>;
            $lte: import("@sinclair/typebox").TString<string>;
            $ne: import("@sinclair/typebox").TString<string>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
        isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
            $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        }>, import("@sinclair/typebox").TObject<{
            [key: string]: import("@sinclair/typebox").TSchema;
        } | undefined>]>>]>>;
    }>>>;
}>>, import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TNumber;
        $gte: import("@sinclair/typebox").TNumber;
        $lt: import("@sinclair/typebox").TNumber;
        $lte: import("@sinclair/typebox").TNumber;
        $ne: import("@sinclair/typebox").TNumber;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TString<string>;
        $gte: import("@sinclair/typebox").TString<string>;
        $lt: import("@sinclair/typebox").TString<string>;
        $lte: import("@sinclair/typebox").TString<string>;
        $ne: import("@sinclair/typebox").TString<string>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<string>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
    isOrganisationUser: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>, import("@sinclair/typebox").TPartial<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        $gt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $gte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $lt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $lte: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $ne: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        $in: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
        $nin: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>>;
    }>, import("@sinclair/typebox").TObject<{
        [key: string]: import("@sinclair/typebox").TSchema;
    } | undefined>]>>]>>;
}>>]>, import("@sinclair/typebox").TObject<{}>]>;
export type UserQuery = Static<typeof userQuerySchema>;
export declare const userQueryValidator: import("@feathersjs/schema").Validator<any, any>;
export declare const userQueryResolver: import("@feathersjs/schema").Resolver<Partial<{
    $limit: number;
    $skip: number;
    $sort: {
        id?: number | undefined;
        name?: number | undefined;
        isOrganisationUser?: number | undefined;
    };
    $select: ("id" | "name" | "isOrganisationUser")[];
    $and: ({
        id?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        name?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        isOrganisationUser?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
    } | {
        $or: {
            id?: number | Partial<{
                $gt: number;
                $gte: number;
                $lt: number;
                $lte: number;
                $ne: number;
                $in: number[];
                $nin: number[];
            } & {}> | undefined;
            name?: string | Partial<{
                $gt: string;
                $gte: string;
                $lt: string;
                $lte: string;
                $ne: string;
                $in: string[];
                $nin: string[];
            } & {}> | undefined;
            isOrganisationUser?: boolean | Partial<{
                $gt?: boolean | undefined;
                $gte?: boolean | undefined;
                $lt?: boolean | undefined;
                $lte?: boolean | undefined;
                $ne?: boolean | undefined;
                $in: boolean[];
                $nin: boolean[];
            } & {}> | undefined;
        }[];
    })[];
    $or: {
        id?: number | Partial<{
            $gt: number;
            $gte: number;
            $lt: number;
            $lte: number;
            $ne: number;
            $in: number[];
            $nin: number[];
        } & {}> | undefined;
        name?: string | Partial<{
            $gt: string;
            $gte: string;
            $lt: string;
            $lte: string;
            $ne: string;
            $in: string[];
            $nin: string[];
        } & {}> | undefined;
        isOrganisationUser?: boolean | Partial<{
            $gt?: boolean | undefined;
            $gte?: boolean | undefined;
            $lt?: boolean | undefined;
            $lte?: boolean | undefined;
            $ne?: boolean | undefined;
            $in: boolean[];
            $nin: boolean[];
        } & {}> | undefined;
    }[];
}> & {
    id?: number | Partial<{
        $gt: number;
        $gte: number;
        $lt: number;
        $lte: number;
        $ne: number;
        $in: number[];
        $nin: number[];
    } & {}> | undefined;
    name?: string | Partial<{
        $gt: string;
        $gte: string;
        $lt: string;
        $lte: string;
        $ne: string;
        $in: string[];
        $nin: string[];
    } & {}> | undefined;
    isOrganisationUser?: boolean | Partial<{
        $gt?: boolean | undefined;
        $gte?: boolean | undefined;
        $lt?: boolean | undefined;
        $lte?: boolean | undefined;
        $ne?: boolean | undefined;
        $in: boolean[];
        $nin: boolean[];
    } & {}> | undefined;
} & {}, HookContext>;
