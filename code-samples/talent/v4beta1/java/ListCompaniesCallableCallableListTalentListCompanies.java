// DO NOT EDIT! This is a generated sample ("CallableList",  "talent_list_companies")
package com.google.cloud.examples.talent.v4beta1;

import com.google.cloud.talent.v4beta1.Company;
import com.google.cloud.talent.v4beta1.CompanyServiceClient;
import com.google.cloud.talent.v4beta1.ListCompaniesRequest;
import com.google.cloud.talent.v4beta1.ListCompaniesResponse;
import com.google.cloud.talent.v4beta1.ProjectName;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

// [START talent_list_companies]
/*
 * Please include the following imports to run this sample.
 *
 * import com.google.cloud.talent.v4beta1.Company;
 * import com.google.cloud.talent.v4beta1.CompanyServiceClient;
 * import com.google.cloud.talent.v4beta1.ListCompaniesRequest;
 * import com.google.cloud.talent.v4beta1.ListCompaniesResponse;
 * import com.google.cloud.talent.v4beta1.ProjectName;
 */
public class ListCompaniesCallableCallableListTalentListCompanies {
  public static void sampleListCompanies(String projectId) {
    // [START talent_list_companies_core]
    try (CompanyServiceClient companyServiceClient = CompanyServiceClient.create()) {
      // String projectId = "Your Google Cloud Project ID";
      ProjectName parent = ProjectName.of(projectId);
      ListCompaniesRequest request =
          ListCompaniesRequest.newBuilder().setParent(parent.toString()).build();
      while (true) {
        ListCompaniesResponse response = companyServiceClient.listCompaniesCallable().call(request);
        for (Company responseItem : response.getCompaniesList()) {
          System.out.printf("Company: %s\n", responseItem.getName());
          System.out.printf("Display name: %s\n", responseItem.getDisplayName());
        }
        String nextPageToken = response.getNextPageToken();
        if (!Strings.isNullOrEmpty(nextPageToken)) {
          request = request.toBuilder().setPageToken(nextPageToken).build();
        } else {
          break;
        }
      }
    } catch (Exception exception) {
      System.err.println("Failed to create the client due to: " + exception);
    }
    // [END talent_list_companies_core]
  }

  public static void main(String[] args) {
    Options options = new Options();
    options.addOption(
        Option.builder("").required(false).hasArg(true).longOpt("project_id").build());

    CommandLine cl = (new DefaultParser()).parse(options, args);
    String projectId = cl.getOptionValue("project_id", "Your Google Cloud Project ID");

    sampleListCompanies(projectId);
  }
}
// FIXME: Insert here clean-up code.

// [END talent_list_companies]
