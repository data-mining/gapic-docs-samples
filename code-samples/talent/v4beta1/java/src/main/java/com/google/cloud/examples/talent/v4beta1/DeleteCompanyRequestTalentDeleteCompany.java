// DO NOT EDIT! This is a generated sample ("Request",  "talent_delete_company")
package com.google.cloud.examples.talent.v4beta1;

import com.google.cloud.talent.v4beta1.CompanyName;
import com.google.cloud.talent.v4beta1.CompanyServiceClient;
import com.google.cloud.talent.v4beta1.DeleteCompanyRequest;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START talent_delete_company]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.talent.v4beta1.CompanyName;
 * import com.google.cloud.talent.v4beta1.CompanyServiceClient;
 * import com.google.cloud.talent.v4beta1.DeleteCompanyRequest;
 */
public class DeleteCompanyRequestTalentDeleteCompany {
  public static void sampleDeleteCompany(String projectIdChanged, String companyIdChanged) {
    // [START talent_delete_company_core]
    try (CompanyServiceClient companyServiceClient = CompanyServiceClient.create()) {
      // String projectIdChanged = "Your Google Cloud Project ID CHANGED";
      // String companyIdChanged = "ID of the company to delete";
      CompanyName name = CompanyName.of(projectIdChanged, companyIdChanged);
      DeleteCompanyRequest request =
          DeleteCompanyRequest.newBuilder().setName(name.toString()).build();
      companyServiceClient.deleteCompany(request);
      // What is going on?
      System.out.println("Hello???");
      System.out.println("Deleted company");
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END talent_delete_company_core]
  }

  public static void main(String[] args) throws Exception {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("project_id_changed").build());
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("company_id_changed").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String projectIdChanged =
        cl.getOptionValue("project_id_changed", "Your Google Cloud Project ID CHANGED");
    String companyIdChanged =
        cl.getOptionValue("company_id_changed", "ID of the company to delete");

    sampleDeleteCompany(projectIdChanged, companyIdChanged);
  }
}
// FIXME: Insert here clean-up code.

// [END talent_delete_company]
