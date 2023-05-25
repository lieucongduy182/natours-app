export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludeFieldsForFiltering = ['sort', 'page', 'limit', 'fields'];

    excludeFieldsForFiltering.forEach((el) => delete queryObj[el]);

    const regexPattern = /\b(gt|gte|lt|lte)\b/g;
    const filterOperator = JSON.stringify(queryObj).replace(
      regexPattern,
      (match) => `$${match}`,
    );

    this.query.find(JSON.parse(filterOperator));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortByFields = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortByFields);
      return this;
    }

    this.query.sort('-created_at');
    return this;
  }

  limitingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query.select(fields);
      return this;
    }
    this.query.select('-__v');
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skipValues = (page - 1) * limit;

    this.query.skip(skipValues).limit(limit);
    return this;
  }
}
