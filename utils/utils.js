function isValidEnumValue(schema, path, value) {
	const allowedValues = schema.path(path).enumValues;
	return allowedValues.includes(value);
}

module.exports = isValidEnumValue;