class DelimiterParser {
  parse(input) {
    return { delimiters: [',', '\n'], stringified: input };
  }
}

class CustomDelimiterParser extends DelimiterParser {
  parse(input) {
    if (!input.startsWith('//')) {
      return super.parse(input);
    }

    const section = input.split('\n')[0];
    const stringified = input.substring(input.indexOf('\n') + 1);

    let delimiters;
    if (section.includes('[')) {
      const matches = section.match(/\[([^\]]+)\]/g);
      delimiters = matches ? matches.map(d => d.slice(1, -1)) : [',', '\n'];
    } else {
      delimiters = [section.substring(2)];
    }

    return { delimiters, stringified };
  }
}

module.exports = CustomDelimiterParser;