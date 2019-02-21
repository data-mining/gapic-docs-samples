// DO NOT EDIT! This is a generated sample ("Request",  "talent_create_company")
package com.google.cloud.examples.talent.v4beta1;

import com.google.cloud.talent.v4beta1.Company;
import com.google.cloud.talent.v4beta1.CompanyServiceClient;
import com.google.cloud.talent.v4beta1.CreateCompanyRequest;
import com.google.cloud.talent.v4beta1.ProjectName;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START talent_create_company]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.talent.v4beta1.Company;
 * import com.google.cloud.talent.v4beta1.CompanyServiceClient;
 * import com.google.cloud.talent.v4beta1.CreateCompanyRequest;
 * import com.google.cloud.talent.v4beta1.ProjectName;
 */
public class CreateCompanyRequestTalentCreateCompany {
  public static void sampleCreateCompany(String projectId, String displayName) {
    // [START talent_create_company_core]
    try (CompanyServiceClient companyServiceClient = CompanyServiceClient.create()) {
      // String projectId = "Your Google Cloud Project ID";
      // String displayName = "My Company Name";
      ProjectName parent = ProjectName.of(projectId);
      String externalId = "Identifier of this company in my system";
      Company company =
          Company.newBuilder().setDisplayName(displayName).setExternalId(externalId).build();
      CreateCompanyRequest request =
          CreateCompanyRequest.newBuilder()
              .setParent(parent.toString())
              .setCompany(company)
              .build();
      Company response = companyServiceClient.createCompany(request);
      System.out.printf("Created company: %s\n", response.getDisplayName());
      System.out.printf("Company name: %s\n", response.getName());
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END talent_create_company_core]
  }

  public static void main(String[] args) {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("project_id").build());
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("display_name").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String projectId = cl.getOptionValue("project_id", "Your Google Cloud Project ID");
    String displayName = cl.getOptionValue("display_name", "My Company Name");

    sampleCreateCompany(projectId, displayName);
  }
}
// FIXME: Insert here clean-up code.

// [END talent_create_company]
