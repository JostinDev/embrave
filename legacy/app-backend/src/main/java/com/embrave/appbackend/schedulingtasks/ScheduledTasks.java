package com.embrave.appbackend.schedulingtasks;

import java.util.concurrent.TimeUnit;

import com.embrave.appbackend.Service.CodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private final CodeService codeService;

    @Autowired
    public ScheduledTasks(CodeService codeService) {
        this.codeService = codeService;
    }

    @Scheduled(fixedRate = 5, timeUnit = TimeUnit.MINUTES)
    public void reportCurrentTime() {
        log.info("Checking code validity");
        codeService.removeInvalidCode();
    }
}
