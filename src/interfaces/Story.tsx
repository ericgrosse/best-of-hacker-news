export interface Story {
  by: string,
  kids: Array<string>, // kids are commentIDs
  comments: Array<string>,
  title: string,
  url: string,
}
