package org.wavesoundback.services.impl;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.wavesoundback.services.FileUploadService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${upload.dir}")
    private String UPLOAD_DIR;
    @Override
    public String uploadCancion(InputStream file, String userId) {
        try {
            byte[] bytes = IOUtils.toByteArray(file);
            Path userDir = Paths.get(UPLOAD_DIR, userId);
            if (!Files.exists(userDir)) {
                Files.createDirectories(userDir);
            }
            Path path = userDir.resolve(UUID.randomUUID().toString());
            Files.write(path, bytes);
            return path.toString();
        } catch (IOException e) {
            System.out.println("Error al subir archivo");
            return null;
        }
    }
}
