import { Query } from 'mongoose';

interface QueryString {
    page?: string;
    sort?: string;
    limit?: string;
    fields?: string;
    [key: string]: any;
}

export class MongoQueryBuilder<T> {
    private _query: Query<T[], T>;
    private _queryString: QueryString;

    constructor(query: Query<T[], T>, queryString: QueryString) {
        this._query = query;
        this._queryString = queryString;
    }

    filter() {
        const queryObj = { ...this._queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        );

        this._query = this._query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this._queryString.sort) {
            const sortBy = this._queryString.sort.split(',').join(' ');
            this._query = this._query.sort(sortBy);
        } else {
            this._query = this._query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this._queryString.fields) {
            const fields = this._queryString.fields.split(',').join(' ');
            this._query = this._query.select(fields);
        } else {
            this._query = this._query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = parseInt(this._queryString.page as string, 10) || 1;
        const limit = parseInt(this._queryString.limit as string, 10) || 100;
        const skip = (page - 1) * limit;
        this._query = this._query.skip(skip).limit(limit);
        return this;
    }

    getQuery() {
        return this._query;
    }

    async get() {
        return await this._query;
    }

    async getOne() {
        return await this._query.findOne();
    }

    async count() {
        return await this._query.countDocuments();
    }
}
