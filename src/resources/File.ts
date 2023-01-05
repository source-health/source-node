import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface File {
  /**
   * Always `file`.
   */
  object: 'file'
  /**
   * Unique ID for the file.
   */
  id: string
  /**
   * The purpose of this uploaded file. Each file is required to have a clearly
   * defined purpose, which controls what types of uploads are allowed and where the
   * file may be referenced.
   */
  purpose: FilePurpose
  /**
   * The filename of the file that was uploaded.
   */
  name: string
  /**
   * The MIME type of the file that was uploaded.
   */
  mime_type: string
  /**
   * The size of the uploaded file in bytes.
   */
  size: number
  /**
   * Temporary URL that can be used to access the file. The URL contained in this
   * field will be valid for 7 days. Once it has expired, you can re-request this
   * resource to get a fresh URL.
   */
  url: string
  /**
   * Variants represent different versions of a file (such as thumbnails). The
   * variants available depend on the file's purpose. Files with the `photo` purpose
   * will have variants.
   */
  variants: Record<string, string>
  /**
   * Timestamp of when the url to access the file expires
   */
  url_expires_at: string
  /**
   * Timestamp of when the file was uploaded.
   */
  created_at: string
}

export type FilePurpose =
  | 'message_attachment'
  | 'photo'
  | 'user_profile_photo'
  | 'document'
  | 'comment_attachment'
  | 'account_logo'
  | 'location_photo'

export interface FileCreateParams {
  /**
   * A file to upload. This field must be provided in a `multipart/form-data`
   * request.
   */
  file: string
  /**
   * The purpose of the uploaded file. Each purpose imposes restrictions on supported
   * file types and use cases.
   */
  purpose: FileCreateParamsPurpose
}

export type FileCreateParamsPurpose =
  | 'message_attachment'
  | 'photo'
  | 'user_profile_photo'
  | 'document'
  | 'comment_attachment'
  | 'account_logo'
  | 'location_photo'

export class FileResource extends Resource {
  /**
   * Uploads a file to Source by sending a `multipart/form-data` request containing
   * the file to upload and any additional metadata.
   *
   * Files must be uploaded through the files API before they can be attached to
   * messages, set as profile photos, or otherwise used by the Source platform.
   */
  public create(params: FileCreateParams, options?: SourceRequestOptions): Promise<File> {
    return this.source.request('POST', '/v1/files', {
      data: params,
      contentType: 'multipart',
      options,
    })
  }

  /**
   * Retrieves the details of an existing file. You need only supply the unique file
   * identifier that was returned upon file creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<File> {
    return this.source.request('GET', `/v1/files/${id}`, {
      options,
    })
  }
}
