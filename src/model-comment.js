export default class ModelComment {
  constructor(comment) {
    return {
      id: comment[`id`],
      text: comment[`comment`],
      user: comment[`author`],
      created: new Date(comment[`date`]),
      emotion: comment[`emotion`],
    };
  }

  static parseComment(comment) {
    return new ModelComment(comment);
  }

  static parseComments(comments) {
    return comments.map(ModelComment.parseComment);
  }

  static toRaw(comment) {
    return {
      "comment": comment.text,
      "date": new Date(comment.created).toISOString(),
      "emotion": comment.emotion,
    };
  }
}
