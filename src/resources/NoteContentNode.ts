export interface NoteContentNode {
  type?: string
  attrs?: Record<string, unknown>
  content?: Array<NoteContentNode>
  marks?: Array<NoteContentNodeMark>
  text?: string
}

export interface NoteContentNodeMark {
  type?: string
  attrs?: Record<string, unknown>
}
