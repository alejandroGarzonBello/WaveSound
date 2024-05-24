package org.wavesoundback.services;

import java.io.InputStream;

public interface FileUploadService{

    String uploadCancion(InputStream file, String userId);
}
